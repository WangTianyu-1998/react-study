import { useRequest, useSize } from "ahooks";
import { message, Modal, PaginationProps, Tooltip } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchData } from "../api";

// 展示省略号的通用配置 如果没有值 则展示--
const commonColProps: any = {
  render: (text: any) => (
    <Tooltip placement="topLeft" title={text?.length > 10 ? text : null}>
      {text || text === 0 ? text : "--"}
    </Tooltip>
  ),
  align: "center",
  // 超过是否展示省略号
  ellipsis: true,
};

// 生成通用columns
export function useCreateCommonColumns(
  columns: ColumnsType<Record<string, any>>
) {
  const memoColumns = useMemo(() => {
    return columns.map((col: Record<string, any>) => ({
      ...commonColProps,
      ...col,
      width:
        col.dataIndex === "operation"
          ? col.width || "250px"
          : col.width || "150px",
    }));
  }, [columns]);

  return memoColumns;
}

interface ListPostDataProps {
  page?: number;
  pageSize?: number;
  [propName: string]: any; // propName为占位符 代表任意属性的key 值为any
}
interface Params {
  initPostData?: ListPostDataProps;
  manual?: boolean;
}

interface ListData {
  list?: any[];
  records?: any[];
  items: any[];
}

const defaultInitPostData: ListPostDataProps = {
  page: 1,
  pageSize: 10,
};

const defaultTableProps: TableProps = {
  style: { flex: 1 },
  className: "common-table",
  bordered: true,
  size: "middle",
  loading: false,
  rowKey: "id",
};

/**
 * url 请求地址
 * params 请求参数 page pageSize 以及其他参数
 */
export function useGetTableList(url: string, params: Params) {
  // 请求参数 如果没有传递 则使用默认值
  const [postData, setPostData] = useState(
    params?.initPostData || defaultInitPostData
  );

  // 用于计算非表格高度,从而动态计算表格高度
  const nonTableRef = useRef(null);
  const nonTableMsg = useSize(nonTableRef);
  const manulRef = useRef(params?.manual);
  const searchedRef = useRef(false);

  const { height: windowHeight } = useSize(document.body) || { height: 0 };

  const [listData, setListData] = useState<ListData>({
    list: [],
    records: [],
    items: [],
  });

  // 分页器参数
  const [pagination, setPagination] = useState<PaginationProps>({
    total: 0,
    current: 1,
    size: "default",
    defaultCurrent: 1, // 默认当前页数
    showQuickJumper: true, // 是否可以快速跳转至某页
    onChange: (page, pageSize) => {
      setPostData((p) => ({ ...p, page, pageSize }));
    },
    showTotal: (total: number) => `共 ${total ?? 0} 条`,
  });

  // 请求table数据
  // 因为修改分页器后 会修改 postData 数据 而 useEffect 监控了 变化就会run发请求
  const { loading, run } = useRequest(fetchData, {
    manual: true,
    onSuccess(res) {
      const { data, ret } = res;
      if (ret === 0) {
        const { total = 0 } = data;
        const newPagination: any = {
          total,
          current: postData.page,
        };
        // 更新分页器数据 始终保持当前页数
        setPagination((p) => ({ ...p, ...newPagination }));
        // 更新列表数据
        setListData(data);
      }
    },
  });

  // 搜索table数据
  const searchTableList = useCallback((assignParams?: Record<string, any>) => {
    // 每次搜索将页数重置为1
    setPostData((originData) => {
      const newPostData = { ...originData, ...assignParams, page: 1 };
      return newPostData;
    });
  }, []);

  // 更新table数据
  const updateTableList = useCallback((assignParams?: Record<string, any>) => {
    setPostData((originData) => {
      const newPostData = { ...originData, ...assignParams };
      return newPostData;
    });
  }, []);

  const createChangeStatusConfirmFunc: <P>(
    changeRequestFunc: (params: P) => Promise<any>,
    successCallbackFunc?: (res?: any) => void
  ) => (props: {
    confirmTitle?: string;
    requestPostData: P;
    confirmContent?: string;
    skipError?: boolean;
  }) => void = useCallback(
    (changeRequestFunc, successCallbackFunc) => {
      return (props) => {
        const {
          confirmTitle = "提示",
          requestPostData,
          confirmContent = "确定要删除该项吗？",
          skipError = false,
        } = props;
        Modal.confirm({
          title: confirmTitle,
          content: confirmContent,
          okButtonProps: { style: { background: "#f60" } },
          onOk: async () => {
            const res = await changeRequestFunc(requestPostData);
            if (res.ret === 0 && skipError === false) {
              message.success("操作完成");
              // 更新table数据
              updateTableList();
              // 请求成功之后的回调
              successCallbackFunc?.();
            }
            // 如果传入 skipError 那么 就可以在外面拿到接口的返回值
            // 然后在回调中就可以根据返回值来进行额外操作
            if (skipError === true) {
              console.log(res);
              successCallbackFunc?.(res);
            }
          },
        });
      };
    },
    [updateTableList]
  );

  const tableProps = useMemo(() => {
    const { height } = nonTableMsg || { height: 0 };

    // 计算表格高度 154为表格上方的高度 47为分页器高度 132为表格下方的高度
    const tableHeight = windowHeight - 154 - height - 47 - 132;

    return {
      ...defaultTableProps,
      loading,
      pagination, // 分页器信息
      dataSource: listData.list || listData.records || listData.items || [],
      scroll: { y: tableHeight }, // 表格滚动高度
    };
  }, [
    nonTableMsg,
    windowHeight,
    loading,
    pagination,
    listData.list,
    listData.records,
    listData.items,
  ]);

  // 初始化时触发一次异步请求
  useEffect(() => {
    if (!manulRef.current) {
      run(url, { data: postData, method: "POST" });
    }
    searchedRef.current = true;
  }, [postData, run, url]);

  return {
    updateTableList, // 更新table数据
    searchTableList, // 搜索table数据
    tableProps, // 表格参数
    listData, // 表格参数 包含loading dateSource pagination scroll等
    nonTableRef, // 给外层容器的ref 控制表格高度
    setListData, // 设置表格数据
    createChangeStatusConfirmFunc, // 创建确认弹窗函数
  };
}

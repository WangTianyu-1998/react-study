import React from 'react';
import img1 from './img1.png';
import img2 from './img2.png';
import LazyLoad from 'react-lazyload';
import MyLazyLoad from './MyLazyLoad';

const LazyWang = React.lazy(() => import('./Wang'));

export default function App() {
  return (
    <div>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <MyLazyLoad
        placeholder={<div>loading...</div>}
        offset={300}
        onContentVisible={() => {
          console.log('render');
        }}
      >
        <LazyWang />
      </MyLazyLoad>
      <LazyLoad placeholder={<div>loading...</div>}>
        <img src={img1} />
      </LazyLoad>
      <LazyLoad placeholder={<div>loading...</div>}>
        <img src={img2} />
      </LazyLoad>
    </div>
  );
}

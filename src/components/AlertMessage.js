import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Snackbar, Alert } from '@mui/material';
import { judgeDeviceByInnerWidth, createIdByTime } from '../utilities/tool';

// 依據裝置寬度決定提示訊息所在位置
const anchorOrigin = {
  vertical: 'top',
  horizontal: 'center',
};
switch (judgeDeviceByInnerWidth()) {
  case "mobile": {
    anchorOrigin.vertical = 'top';
    anchorOrigin.horizontal = 'center';
    break;
  }
  case "tablet": {
    anchorOrigin.vertical = 'top';
    anchorOrigin.horizontal = 'right';
    break;
  }
  case "PC": {
    anchorOrigin.vertical = 'top';
    anchorOrigin.horizontal = 'right';
    break;
  }
  default: {
    break;
  }
}

/**
 * 移除節點
 * @param {"id"|"class"} selectWay - 移除的方法
 * @param {number|string} id - 欲移除節點的 id
 */
function removeNode(selectWay, selectName) {
  switch (selectWay) {
    case "id": {
      const node = document.querySelector(`[id='${selectName}']`);
      const parent = node.parentNode;
      parent.removeChild(node);
      break;
    }
  }
}

function Message(props) {
  const { content, duration, type } = { ...props };
  const [showStatus, setShowStatus] = useState(true);
  function handleClose() {
    setShowStatus(false);
  }

  return (
    <Snackbar
      open={showStatus}
      autoHideDuration={duration}
      anchorOrigin={{
        vertical: anchorOrigin.vertical,
        horizontal: anchorOrigin.horizontal
      }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={type}
      >
        {content}
      </Alert>
    </Snackbar>
  );
}

const AlertMessage = {
  dom: null,
  success({ content, duration = 3000 }) {
    // Step: 創建一個 div 節點
    this.dom = document.createElement('div');

    // Step: 製作隨機 id
    const id = createIdByTime();
    this.dom.setAttribute('id', id);

    // Step: 定義 component
    const JSXdom =
      <Message
        content={content}
        duration={duration}
        type="success"
      />;

    // Step: 渲染 DOM
    createRoot(this.dom).render(JSXdom);

    // Step: 掛載到 body
    document.body.appendChild(this.dom);

    // Step: 定時後移除此節點
    setTimeout(() => {
      removeNode('id', id);
    }, duration);
  },
  error({ content, duration = 3000 }) {
    this.dom = document.createElement('div');
    const JSXdom =
      <Message
        content={content}
        duration={duration}
        type="error"
      />;
    createRoot(this.dom).render(JSXdom);
    document.body.appendChild(this.dom);
  },
  warning({ content, duration = 3000 }) {
    this.dom = document.createElement('div');
    const JSXdom =
      <Message
        content={content}
        duration={duration}
        type="warning"
      />;
    createRoot(this.dom).render(JSXdom);
    document.body.appendChild(this.dom);
  },
  info({ content, duration = 3000 }) {
    this.dom = document.createElement('div');
    const JSXdom =
      <Message
        content={content}
        duration={duration}
        type="warning"
      />;
    createRoot(this.dom).render(JSXdom);
    document.body.appendChild(this.dom);
  }
};

export default AlertMessage;

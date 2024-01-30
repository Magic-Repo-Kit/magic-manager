import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vscDarkPlus,
  atomDark,
  tomorrow,
  coy,
  solarizedlight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
// coy 、atomDark
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式

const MarkdownRenderer = ({ markdown }) => {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);

  const components = {
    p: ({ node, ...props }) => <p style={{ margin: '0 0 8px 0' }} {...props} />,
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={darkMode ? atomDark : coy} //主题
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return <ReactMarkdown components={components}>{markdown}</ReactMarkdown>;
};

export default MarkdownRenderer;

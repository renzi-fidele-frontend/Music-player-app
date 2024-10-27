import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

const Tooltip = ({ conteudo, children }) => {
   return <Tippy content={conteudo}>{children}</Tippy>;
};
export default Tooltip;

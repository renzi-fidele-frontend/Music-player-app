import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
// As opções de tema são: light, light-border, material, translucent

const Tooltip = ({ conteudo, children, tipo }) => {
   return (
      <Tippy theme={tipo} content={conteudo}>
         {children}
      </Tippy>
   );
};
export default Tooltip;

// import React from "react";
// import { Link } from "react-router-dom";
// import "../Works.scss";

// const WorkOption = ({
//   imageURL,
//   backgroundClassName,
//   headerClssName,
//   title,
//   titleClassName
// }) => {
//   //to={`/works/${title}`}
//   return (
//     <Link
//       to={`/works/${title}`}
//       state={{title}}
//       className={backgroundClassName}
//       style={{
//         backgroundImage: `url(${imageURL})`,
//       }}
//     >
   
//         <span className={headerClssName}>
//           <h4 className={titleClassName}>{title}</h4>
//         </span>
      
//     </Link>
//   );
// };
// export default WorkOption;

import React from "react";
import { Link } from "react-router-dom";
import "../Works.scss";

const WorkOption = ({
  imageURL,
  backgroundClassName,
  headerClssName,
  title,
  to,
  titleClassName
}) => {
  return (
    <Link
      to={`/works/${to}`}
      state={{title}}
      className={backgroundClassName}
      style={{
        backgroundImage: `url(${imageURL})`,
      }}
    >
   
        <span className={headerClssName}>
          <h4 className={titleClassName}>{title}</h4>
        </span>
      
    </Link>
  );
};
export default WorkOption;

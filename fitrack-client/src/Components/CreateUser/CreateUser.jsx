//class component kept for reference purposes

// import React from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import "./createUser.scss";

// export default class CreateUser extends React.Component {
//   state = {
//     username: "",
//   };

//   onChangeUsername = (e) => {
//     this.setState({
//       username: e.target.value,
//     });
//   };

//   onSubmit = (e) => {
//     e.preventDefault();
//     const user = {
//       username: this.state.username,
//     };

//     axios
//       .post("/users/add", user)
//       .then((res) => {
//         this.props.history.push({
//           pathname: "/createworkout",
//           state: user,
//         });
//         console.log(res.data);
//       })
//       .catch((err) => console.log(err));
//   };

//   render() {
//     // Framer motion animations
//     const cardVariants = {
//       initial: {
//         opacity: 0,
//         x: "-500vw",
//         scale: 0,
//       },
//       in: {
//         opacity: 1,
//         x: 0,
//         scale: 1,
//       },
//       out: {
//         opacity: 0,
//         x: "500vw",
//         scale: 0,
//       },
//     };
//     // Framer motion animations
//     const cardTransition = {
//       type: "tween",
//       ease: "anticipate",
//       duration: 0.8,
//     };
//     return (
//       <div className="user-container">
//         <motion.div
//           className="user-container__card"
//           initial="initial"
//           animate="in"
//           exit="out"
//           variants={cardVariants}
//           transition={cardTransition}
//         >
//           <div className="user-container__title-container">
//             <h2 className="user-container__title">CREATE USER </h2>
//           </div>
//           <div className="user-container__form-container">
//             <div className="user-container__image"></div>
//             <form className="user-container__form" onSubmit={this.onSubmit}>
//               <div className="user-container__username-container">
//                 <label className="user-container__username-label" htmlFor="">
//                   USERNAME
//                 </label>
//                 <input
//                   className="user-container__user"
//                   type="text"
//                   value={this.state.username}
//                   onChange={this.onChangeUsername}
//                 />
//               </div>
//               <div className="user-container__button-container">
//                 <button className="user-container__button">CREATE</button>
//               </div>
//             </form>
//           </div>
//         </motion.div>
//       </div>
//     );
//   }
// }

import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import "./createUser.scss";

 const CreateUser = () => {
  
  const [userName, setUserName] = useState('')
  let history = useHistory()


  function onChangeUsername (e){
    setUserName(e.target.value)
  };
  
  
  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: userName,
    };
  
    axios
      .post("/users/add", user)
      .then((res) => {
        history.push({
          pathname: "/createworkout",
          state: user,
        });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  // Framer motion animations
  const cardVariants = {
    initial: {
      opacity: 0,
      x: "-500vw",
      scale: 0,
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      x: "500vw",
      scale: 0,
    },
  };
  // Framer motion animations
  const cardTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8,
  };

  return (
    <div className="user-container">
    <motion.div
      className="user-container__card"
      initial="initial"
      animate="in"
      exit="out"
      variants={cardVariants}
      transition={cardTransition}
    >
      <div className="user-container__title-container">
        <h2 className="user-container__title">CREATE USER </h2>
      </div>
      <div className="user-container__form-container">
        <div className="user-container__image"></div>
        <form className="user-container__form" 
        
        onSubmit={handleSubmit}
        
        >
          <div className="user-container__username-container">
            <label className="user-container__username-label" htmlFor="">
              USERNAME
            </label>
            <input
              className="user-container__user"
              type="text"
              value={userName}
              onChange={onChangeUsername}
            />
          </div>
          <div className="user-container__button-container">
            <button className="user-container__button">CREATE</button>
          </div>
        </form>
      </div>
    </motion.div>
  </div>
  )
}

export default CreateUser



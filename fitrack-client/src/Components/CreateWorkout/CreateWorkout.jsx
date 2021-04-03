import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./createWorkout.scss";

export default class CreateWorkout extends React.Component {
  state = {
    username: this.props.currentUser || "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  };

  componentDidMount() {
    axios
      .get("/users")
      .then((response) => {
        // checking if there are users in the database

        if (response.data.length > 0) {
          const user = this.props.location.state.username;
          this.setState({
            // returning each user in the array by username
            users: response.data.map((user) => user.username),
            // setting the first element in the array to be the first user displayed
            username: user,
          });
        }
      })
      .catch((error) => console.log(error));
  }

  onchangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  onchangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  onchangeDuration = (e) => {
    this.setState({
      duration: e.target.value,
    });
  };
  onchangeDate = (e) => {
    this.setState({
      date: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const workout = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    axios
      .post("/workouts/add", workout)
      .then((res) => {
        this.props.history.push({
          pathname: "/workoutlist",
          state: { username: this.state.username },
        });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  render() {
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
      <div className="create-container">
        <motion.div
          className="create-container__card"
          initial="initial"
          animate="in"
          exit="out"
          variants={cardVariants}
          transition={cardTransition}
        >
          <div className="create-container__title-container">
            <h2 className="create-container__title">CREATE WORKOUT</h2>
          </div>
          <div className="create-container__form-container">
            <form
              onSubmit={this.onSubmit}
              className="create-container__form"
              action=""
            >
              <div className="create-container__username-container">
                <label className="create-container__username-label" htmlFor="">
                  USERNAME
                </label>
                <select
                  className="create-container__username"
                  value={this.state.username}
                  onChange={this.onchangeUsername}
                >
                  {this.state.users.map((user) => {
                    return (
                      <option key={user} value={user}>
                        {user}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="create-container__description-container">
                <label
                  className="create-container__description-label"
                  htmlFor=""
                >
                  DESCRIPTION
                </label>
                <textarea
                  className="create-container__description"
                  value={this.state.description}
                  onChange={this.onchangeDescription}
                />
              </div>
              <div className="create-container__duration-container">
                <label className="create-container__duration-label" htmlFor="">
                  DURATION (in Minutes)
                </label>
                <input
                  className="create-container__duration"
                  type="number"
                  min="0"
                  max="59"
                  value={this.state.duration}
                  onChange={this.onchangeDuration}
                />
              </div>
              <div className="create-container__date-container">
                <label className="create-container__date-label" htmlFor="">
                  DATE
                </label>
                <input
                  className="create-container__date"
                  type="date"
                  selected={this.state.date}
                  onChange={this.onchangeDate}
                />
              </div>
              <div className="create-container__button-container">
                <button className="create-container__button">LET'S GO !</button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }
}

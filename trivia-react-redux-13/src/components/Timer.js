// import React, { Component } from 'react';

// class Timer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       number: 30,
//     }
//   }

//   componentDidMount() {
//     const { timeout } = this.props;
//     const setInt = setInterval(() => {
//       if (this.state.number === 0) {
//         clearInterval(setInt)
//         timeout();
//         return true;
//       }
//       return this.setState((prevState) => ({
//         number: prevState.number - 1,
//       }))
//     }, 1000);
//   }

//   render() {
//     const { number } = this.state; // Ao renderizar novamente, lê o state decrescido
//     return (
//       <div>
//         <p>{number}</p>
//       </div>
//     );
//   }
// }

// export default Timer;

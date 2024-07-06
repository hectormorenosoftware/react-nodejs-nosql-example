import React from "react";
import { withRouter } from "react-router-dom";
import "./Header.css";

class Header extends React.PureComponent {
  state = {
    hasScrolled: false,
  };

  componentDidMount() {
    return window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    return window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const scrollTop = window.pageYOffset;

    if (scrollTop > 50) {
      return this.setState({ hasScrolled: true });
    } else {
      return this.setState({ hasScrolled: false });
    }
  };

  goToContactPage = () => {
    const { history } = this.props;

    return history.push("/contact");
  };

  render() {
    return (
      <div
        className={this.state.hasScrolled ? "Header HeaderScrolled" : "Header"}
      >
        <div className="HeaderGroup">
          <a href="#companies">Companies</a>
          <a href="#about">About</a>
          <a href="#linked-in">Linked In</a>
          <a style={{ cursor: "pointer" }} onClick={this.goToContactPage}>
            Contact
          </a>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);

import React, { Component } from "react";
import { Modal } from "../../components";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    constructor(props) {
      super(props)

      // Add a request interceptor
      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.setState({ error: null });
        return request;
      });

      // Add a response interceptor
      this.resInterceptor = axios.interceptors.response.use(
        response => {
          return response;
        },
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.enject(this.reqInterceptor);
      axios.interceptors.request.enject(this.resInterceptor);
    }

    errorConfiredHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            orderCanceled={this.errorConfiredHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;

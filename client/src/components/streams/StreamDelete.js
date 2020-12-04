import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";
import { Link } from "react-router-dom";

class StreamDelete extends React.Component {
  componentDidMount = () => {
    this.props.fetchStream(this.props.match.params.id);
  };

  renderActions = () => {
    return (
      <React.Fragment>
        <Link className="ui button" to="/">
          Cancel
        </Link>
        <Link
          className="ui button negative"
          onClick={() => this.props.deleteStream(this.props.match.params.id)}
        >
          Delete
        </Link>
      </React.Fragment>
    );
  };

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={`Are you sure you want to delete this stream? ${this.props.streamToDelete?.title}`}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { streamToDelete: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);

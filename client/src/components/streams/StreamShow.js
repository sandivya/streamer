import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import flvjs from "flv.js";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentWillUnmount = () => {
    this.player.destroy();
  };

  componentDidMount = () => {
    this.props.fetchStream(this.props.match.params.id);
    this.player = flvjs.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${this.props.match.params.id}`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  };

  render() {
    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h1>{this.props.stream?.title}</h1>
        <h5>{this.props.stream?.description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);

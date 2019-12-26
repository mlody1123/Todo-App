import React, { Component } from "react";
import AddItem from "./AddItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getItems, changeFilter } from "../../actions/todoActions";
import ListItem from "./ListItem";
import Weekday from "../../common/Weekday";

class List extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  filterHandler(e) {
    this.props.changeFilter(e.target.value);
  }

  render() {
    const { items, loading, filter } = this.props.item;
    let listContent;
    if (items === null || loading) {
      listContent = <p>ladowanie</p>; //TODO: Loading spinner
    } else {
      if (items !== undefined && items && items.length > 0) {
        switch (filter) {
          case "completed":
            listContent = (
              <div>
                {items
                  .filter(item => !item.active)
                  .map(item => (
                    <ListItem key={item._id} item={item} />
                  ))}
              </div>
            );
            break;

          case "active":
            listContent = (
              <div>
                {items
                  .filter(item => item.active)
                  .map(item => (
                    <ListItem key={item._id} item={item} />
                  ))}
              </div>
            );
            break;

          default:
            listContent = (
              <div>
                {items.map(item => (
                  <ListItem key={item._id} item={item} />
                ))}
              </div>
            );
        }
      }
    }

    return (
      <div className="list ">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-4 m-auto">
              <Weekday />
              <div className="bg-white rounded shadow-sm p-3 mb-5 text-center">
                {listContent}
                <AddItem />
              </div>
              <div className="text-center">
                <button
                  className="btn btn-sm btn-info m-2"
                  aria-pressed="true"
                  onClick={this.filterHandler.bind(this)}
                  value="all"
                  disabled={filter === "all" ? true : false}
                >
                  All
                </button>
                <button
                  className="btn btn-sm btn-info m-2 "
                  aria-pressed="true"
                  onClick={this.filterHandler.bind(this)}
                  value="active"
                  disabled={filter === "active" ? true : false}
                >
                  Active
                </button>
                <button
                  className="btn btn-sm btn-info m-2 "
                  aria-pressed="true"
                  onClick={this.filterHandler.bind(this)}
                  value="completed"
                  disabled={filter === "completed" ? true : false}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

List.propTypes = {
  item: PropTypes.object.isRequired,
  getItems: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getItems, changeFilter }
)(List);

import React from "react";
import { useSubscription, gql } from "@apollo/client";
import { List, ListItem } from "./resource/Lists";
import { Badge } from "./resource/Badge";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import moment from "moment";

const SCHEDULES = gql`
  subscription MySubscription {
    schedules(order_by: { date: desc }) {
      title
      date
      start_at
      end_at
    }
  }
`;

const containerStyle = {
  width: "100%",
  margin: "auto auto",
  background: "#C5EBEB",
  boxShadow: "0 0 3px rgba(0,0,0, 0.1)",
};

export default function Schedules() {
  const { loading, error, data } = useSubscription(SCHEDULES);

  if (loading) return <p>Loading..... </p>;
  if (error) return <p>Error.... </p>;

  return (
    <div style={containerStyle}>
      <List>
        <Link to={"/create"}>
          {" "}
          <span>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              style={{
                alignSelf: "stretch",
                margin: "5px",
                fontWeight: "bolder",
              }}
            >
              Create Schedule
            </Button>
          </span>
        </Link>
        {data.schedules.map(({ id, title, date, start_at, end_at }) => (
          <ListItem key={id}>
            {title}{" "}
            <Badge>
              {""}
              {moment(date).format("MMMM Do YYYY")}
              {""}
            </Badge>
            | {moment(start_at, "HH:mm:ss").format("hh:mm A")} -{" "}
            {moment(end_at, "HH:mm:ss").format("hh:mm A")}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

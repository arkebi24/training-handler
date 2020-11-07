import React from "react";
import { Button, Form, Input, DatePicker, TimePicker } from "antd";
import { useMutation, gql } from "@apollo/client";

const CREATE_SCHEDULE = gql`
  mutation createschedule(
    $title: String!
    $date: date!
    $start_at: time!
    $end_at: time!
  ) {
    insert_schedules(
      objects: {
        title: $title
        date: $date
        start_at: $start_at
        end_at: $end_at
      }
    ) {
      affected_rows
    }
  }
`;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};

const Createschedule = (props) => {
  const [createschedule] = useMutation(CREATE_SCHEDULE);

  const onFinish = (fieldsValue) => {
    //fieldsValue.preventDefault();
    const values = {
      ...fieldsValue,
      title: fieldsValue["title"],
      date: fieldsValue["date-picker"].format("YYYY-MM-DD"),
      start_time: fieldsValue["start_time_picker"].format("HH:mm:ss"),
      end_time: fieldsValue["end_time_picker"].format("HH:mm:ss"),
    };
    // console.log('Received values of form: ', values);
    createschedule({
      variables: {
        title: values["title"],
        date: values["date"],
        start_at: values["start_time"],
        end_at: values["end_time"],
      },
    });
    props.history.push("/");
  };

  return (
    <Form name="time_related_controls" {...formItemLayout} onFinish={onFinish}>
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please input title!" }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item name="date-picker" label="Date" {...config}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="start_time_picker" label="Start Time" {...config}>
        <TimePicker />
      </Form.Item>
      <Form.Item name="end_time_picker" label="End Time" {...config}>
        <TimePicker />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Createschedule;

//ReactDOM.render(<CollectionsPage />, mountNode);

import React from 'react';
import { Button, Icon, Form, Input, Grid } from 'semantic-ui-react';
import { useRef } from 'react';

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
  const Refr=useRef();
  return (
    <Form onSubmit={handleSubmit} style={{ width: '100%', padding: '25px' }}>
      <Grid>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={12}>
            <Input
              fluid
              autoFocus
              ref={Refr}
              type="text"
              placeholder="Add Item"
              required
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              fluid
              primary
              onClick ={() => Refr.current.focus()}
              type="submit"
              aria-label="Add Item"
            >
              <Icon name="plus"/>
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default AddItem;

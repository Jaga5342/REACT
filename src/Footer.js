import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

const Footer = ({ length }) => {
  return (
    <footer style={{ backgroundColor: '#2185d0', color: 'white', padding: '1em' }}>
    
      <Container>
        <Grid centered>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <p>
                List {length === 1 ? 'item' : 'items'} = {length}
                
              </p>
             
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer

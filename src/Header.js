import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

const Header = (props) => {
  return (
    <header style={{ 
      backgroundColor: '#2185d0', 
      color: 'white', 
      padding: '30px', 
      textAlign: 'center', 
      display: 'flex', 
      justifyContent: 'center' 
    }}>
      <Container>
        <Grid>
          {/* Use responsive Grid properties */}
          <Grid.Row>
            <Grid.Column 
              
             
            >
              <h3>{props.name}</h3>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </header>
  );
};

// Default props for the component
Header.defaultProps = {
  name: 'TODO-LIST',
};

export default Header;

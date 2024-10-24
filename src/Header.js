import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

const Header = (props) => {
  return (
    <header style={{ backgroundColor: '#2185d0', color: 'white',padding:'30px',textAlign:'center',justifyContent:'center' }}>
    <div>
      <Container>
        <Grid >
          <Grid.Row>
            <Grid.Column >
              <h1 style={{textAlign:'center'}}>{props.name}</h1>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      </div>
    </header>
  );
};

// Default props for the component
Header.defaultProps = {
  name: 'TODO-LIST',
};

export default Header;

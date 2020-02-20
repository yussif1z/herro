import React from 'react';
import {
    Responsive,
    Container,
    Icon,
    Input,
    Button,
    Form,
    Grid
} from 'semantic-ui-react';

export default function RegisterForm() {
    return (
        <Responsive>
          <Container fluid>
            <Grid centered>
              <Grid.Column mobile={16} tablet={7} computer={6}>
                <h4 className="text-center mb-4"><div>Sign in</div></h4>
                <Form>
  
                  <Form.Field>
                    <Input fluid iconPosition='left' placeholder='username'>
                      <Icon name='user' />
                      <input type="text" />
                    </Input>
                  </Form.Field>
  
                  <Form.Field>
                    <Input fluid iconPosition='left' placeholder='password'>
                      <Icon name='lock' />
                      <input type="password" />
                    </Input>
                  </Form.Field>

                  <Form.Field>
                    <Input fluid iconPosition='left' placeholder='confirm password'>
                      <Icon name='lock' />
                      <input type="text" />
                    </Input>
                  </Form.Field>

                  <Form.Field>
                    <Input fluid iconPosition='left' placeholder='first name'>
                      <Icon name='lock' />
                      <input type="password" />
                    </Input>
                  </Form.Field>

                  <Form.Field>
                    <Input fluid iconPosition='left' placeholder='last name'>
                      <Icon name='lock' />
                      <input type="password" />
                    </Input>
                  </Form.Field>

                  <Form.Field>
                    <Input fluid iconPosition='left' placeholder='birth'>
                      <Icon name='lock' />
                      <input type="password" />
                    </Input>
                  </Form.Field>

                  <Form.Field>
                    <Input fluid iconPosition='left' placeholder='email'>
                      <Icon name='lock' />
                      <input type="password" />
                    </Input>
                  </Form.Field>
  
                  <div>
                    <Button color='yellow' animated>
                      <Button.Content visible>Sign up</Button.Content>
                      <Button.Content hidden>
                        <Icon name='arrow right' />
                      </Button.Content>
                    </Button>
                  </div>
  
                </Form>
              </Grid.Column>
            </Grid>
          </Container>
        </Responsive>
      );
}
import Repeatable from 'react-repeatable';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import './App.css';
import { Button, Container, Row, ProgressBar, Col, Tabs, Tab, Modal } from 'react-bootstrap';
import bottle_src from './img/vodka.svg';
import glass_src from './img/wine.svg';
import shaker_src from './img/shaker.svg';
import salt_src from './img/salt.svg';
import plate_src from './img/plate.svg';
import ice_src from './img/ice.svg';
import milk_src from './img/milk.svg';
import posed from 'react-pose';
import spoon_src from './img/spoon.svg';
// delete the other src from above since they're provided by the user

const Bottle = posed.img({
  standing: { rotate: '0deg' },
  pouring: {
    rotate: '-165deg',
    transition: { duration: 400 }
  }
});

const PourLiquid = posed.div({
  standing: { height: '0' },
  pouring: {
    height: '150px',
    delay: 200,
  }
});

const PourSolid = posed.div({
  standing: { height: '0px' },
  pouring: {
    height: '200px',
    delay: 200,
  }
});

const Shaker = posed.img({
  up: { y: 0 },
  down: { y: 100 }
});

const Ingredient = posed.img({
  up: { y: 0 },
  down: {
    y: 100,
    transition: { duration: 50 },
  }
});

const FilledIngredient = posed.img({
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
})

const Spoon = posed.img({
  left: { x: -30 },
  right: { x: 30 }
})

const PosedH5 = posed.h5({
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
})

const PosedProgressBar = posed(React.forwardRef((props, ref) => <ProgressBar {...props} ref={ref} />))({
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
});

export class PourLiquidGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      target: this.props.target,
      pressed: false,
      completed: false,
      success: false,
      hint: false,
      show_modal: false,
    }
  }

  handleCloseModal() {
    this.setState({
      show_modal: false,
    })
  }

  handleOpenModal() {
    var result = (this.state.progress === this.state.target);
    this.setState({
      completed: true,
      show_modal: true,
      success: result,
    })
  }

  getResult() {
    var result = (this.state.success);
    if (result) {
      return (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Congratulations! You've successfully completed this step.</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => console.log("Continue to next step...")}>
              Continue
            </Button>
          </Modal.Footer>
        </div>
      );
    } else {
      return (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Failed</Modal.Title>
          </Modal.Header>
          <Modal.Body>Unfortunately, you've failed this step.</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => console.log("Reload the page...")}>
              Try Again
            </Button>
          </Modal.Footer>
        </div>
      );
    }
  }

  render() {
    return (
      <Container>
        <Row className="mt-5">
          <Col>
            <ProgressBar>
              <ProgressBar animated variant="info" now={this.state.progress} key={1} />
              <PosedProgressBar animated variant="danger" now={this.state.target - this.state.progress} key={2} pose={this.state.hint ? 'visible' : 'hidden'} />
            </ProgressBar>
          </Col>
        </Row>
        <Container>
          <Row className="mt-5">
            <Col sm={8}>
              <Row>
                <Col sm={3} className="mx-auto">
                  <Bottle className="front img-fluid test" src={this.props.ingredient_src} alt={'ingredient'} pose={this.state.pressed ? 'pouring' : 'standing'} />
                </Col>
              </Row>
              <Row className="pour-row">
                <Col sm={3} className="mx-auto">
                  <PourLiquid id="pour_liquid" className="mx-auto" pose={this.state.pressed ? 'pouring' : 'standing'} />
                </Col>
              </Row>
              <Row>
                <Col sm={3} className="mx-auto">
                  <img className="img-fluid" src={this.props.equipment_src} alt={'equipment'} />
                </Col>
              </Row>
            </Col>
            <Col sm={2} className="mx-auto">
              <PosedH5 pose={this.state.hint ? 'visible' : 'hidden'}>Target: {this.state.target + " " + this.props.unit}</PosedH5>
              <h5>Current: {this.state.progress + " " + this.props.unit}</h5>
              <Row className="my-3 mt-5">
                <Repeatable
                  tag={Button}
                  variant="info"
                  disabled={this.state.completed}
                  repeatDelay={0}
                  repeatInterval={150}
                  onPress={() => {
                    this.setState({
                      pressed: true,
                    })
                  }}
                  onHoldStart={() => {
                  }}
                  onHold={() => {
                    this.setState({
                      progress: Math.min(this.state.progress + 1, 100)
                    });
                  }}
                  onHoldEnd={() => {
                  }}
                  onRelease={() => {
                    this.setState({
                      pressed: false,
                    })
                  }}
                >
                  POUR 
                </Repeatable>
              </Row>
              <Row className="my-3">
                <Button variant="info"
                  onClick={() => this.handleOpenModal()}
                >COMPLETE</Button>
                <Modal show={this.state.show_modal} onHide={() => this.handleCloseModal()}>
                  <Modal.Body>{this.getResult()}</Modal.Body>
                </Modal>
              </Row>
              <Row className="my-3">
                <Button variant="info"
                  onClick={() => {
                    this.setState({
                      hint: true,
                    });
                  }}
                  disabled={this.state.hint || this.state.completed}
                >GET HINT</Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export class PourSolidGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      target: this.props.target,
      pressed: false,
      completed: false,
      success: false,
      hint: false,
      show_modal: false,
    }
  }

  handleCloseModal() {
    this.setState({
      show_modal: false,
    })
  }

  handleOpenModal() {
    var result = (this.state.progress === this.state.target);
    this.setState({
      completed: true,
      show_modal: true,
      success: result,
    })
  }

  getResult() {
    var result = (this.state.success);
    if (result) {
      return (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Congratulations! You've successfully completed this step.</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => console.log("Continue to next step...")}>
              Continue
            </Button>
          </Modal.Footer>
        </div>
      );
    } else {
      return (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Failed</Modal.Title>
          </Modal.Header>
          <Modal.Body>Unfortunately, you've failed this step.</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => console.log("Reload the page...")}>
              Try Again
            </Button>
          </Modal.Footer>
        </div>
      );
    }
  }

  checkProgress() {
    if (!this.state.completed && this.state.progress > (this.state.target)) {
      this.setState({
        completed: true,
        drink_result: 'FAILED',
        progress: 0,
      })
    }
  }


  render() {
    return (
      <Container>
        <Row className="mt-5">
          <Col>
            <ProgressBar>
              <ProgressBar animated variant="info" now={this.state.progress} key={1} />
              <PosedProgressBar animated variant="danger" now={this.state.target - this.state.progress} key={2} pose={this.state.hint ? 'visible' : 'hidden'} />
            </ProgressBar>
          </Col>
        </Row>
        <Container>
          <Row className="mt-5">
            <Col sm={8}>
              <Row>
                <Col sm={3} className="mx-auto">
                  <Bottle className="front img-fluid test" src={this.props.ingredient_src} alt={'ingredient'} pose={this.state.pressed ? 'pouring' : 'standing'} />
                </Col>
              </Row>
              <Row className="pour-row">
                <Col sm={3} className="mx-auto">
                  <PourSolid id="pour_solid" className="mx-auto" pose={this.state.pressed ? 'pouring' : 'standing'} />
                </Col>
              </Row>
              <Row>
                <Col sm={3} className="mx-auto">
                  <img className="img-fluid" src={this.props.equipment_src} alt={'equipment'} />
                </Col>
              </Row>
            </Col>
            <Col sm={2} className="mx-auto">
              <PosedH5 pose={this.state.hint ? 'visible' : 'hidden'}>Target: {this.state.target + " " + this.props.unit}</PosedH5>
              <h5>Current: {this.state.progress + " " + this.props.unit}</h5>
              <Row className="my-3 mt-5">
                <Repeatable
                  tag={Button}
                  variant="info"
                  disabled={this.state.completed}
                  repeatDelay={0}
                  repeatInterval={150}
                  onPress={() => {
                    this.setState({
                      pressed: true,
                    })
                  }}
                  onHoldStart={() => {
                  }}
                  onHold={() => {
                    this.setState({
                      progress: Math.min(this.state.progress + 1, 100)
                    });
                  }}
                  onHoldEnd={() => {
                  }}
                  onRelease={() => {
                    this.setState({
                      pressed: false,
                    })
                  }}
                >
                  POUR 
                </Repeatable>
              </Row>
              <Row className="my-3">
                <Button variant="info"
                  onClick={() => this.handleOpenModal()}
                >COMPLETE</Button>
                <Modal show={this.state.show_modal} onHide={() => this.handleCloseModal()}>
                  <Modal.Body>{this.getResult()}</Modal.Body>
                </Modal>
              </Row>
              <Row className="my-3">
                <Button variant="info"
                  onClick={() => {
                    this.setState({
                      hint: true,
                    });
                  }}
                  disabled={this.state.hint || this.state.completed}
                >GET HINT</Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

// for the shake game -- the limit is 10 
export class ShakeGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      target: (this.props.target * 10),
      pressed: false,
      completed: false,
      success: false,
      hint: false,
      show_modal: false,
    }
  }

  handleCloseModal(){
    this.setState({
      show_modal: false,
    })
  }

  handleOpenModal(){
    var result = (this.state.progress === this.state.target);
    this.setState({
      completed: true,
      show_modal: true,
      success: result,
    })
  }

  getResult() {
    var result = (this.state.success);
    if (result) {
      return (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Congratulations! You've successfully completed this step.</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => console.log("Continue to next step...")}>
              Continue
            </Button>
          </Modal.Footer>
        </div>
      );
    } else {
      return (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Failed</Modal.Title>
          </Modal.Header>
          <Modal.Body>Unfortunately, you've failed this step.</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => console.log("Reload the page...")}>
              Try Again
            </Button>
          </Modal.Footer>
        </div>
      );
    }
  }

  render() {
    return (
      <Container>
         <Row className="mt-5">
          <Col>
            <ProgressBar>
              <ProgressBar animated variant="info" now={this.state.progress} key={1} />
              <PosedProgressBar animated variant="danger" now={this.state.target - this.state.progress} key={2} pose={this.state.hint ? 'visible' : 'hidden'} />
            </ProgressBar>
          </Col>
        </Row>
        <Container>
          <Row className="mt-5">
            <Col sm={8}>
              <Row>
                <Col sm={3} className="mx-auto">
                  <Shaker className="img-fluid" src={this.props.equipment_src} alt={'equipment'} pose={this.state.pressed ? 'up' : 'down'}/>
                </Col>
              </Row>
            </Col>
            <Col sm={2} className="mx-auto">
              <PosedH5 pose={this.state.hint ? 'visible' : 'hidden'}>Target: {this.state.target / 10}</PosedH5>
              <h5>Current: {this.state.progress / 10}</h5>
              <Row className="my-3 mt-5">
                <Repeatable
                  tag={Button}
                  variant="info"
                  disabled={this.state.completed}
                  repeatDelay={0}
                  repeatInterval={150}
                  onPress={() => {
                    this.setState({
                      pressed: true,
                      progress: Math.min(this.state.progress + 10, 100),
                    })
                  }}
                  onHoldStart={() => {
                  }}
                  onHold={() => {
                  }}
                  onHoldEnd={() => {
                  }}
                  onRelease={() => {
                    this.setState({
                      pressed: false,
                    })
                  }}
                >
                  SHAKE
                </Repeatable>
              </Row>
              <Row className="my-3">
                <Button variant="info"
                  onClick={() => this.handleOpenModal()}
                >COMPLETE</Button>
                <Modal show={this.state.show_modal} onHide={() => this.handleCloseModal()}>
                  <Modal.Body>{this.getResult()}</Modal.Body>
                </Modal>
              </Row>
              <Row className="my-3">
                <Button variant="info"
                  onClick={() => {
                    this.setState({
                      hint: true,
                    });
                  }}
                  disabled={this.state.hint || this.state.completed}
                >GET HINT</Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}


// for the fill game -- the limit is 10 
export class FillGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      target: (this.props.target * 10),
      pressed: false,
      completed: false,
      success: false,
      hint: false,
      show_modal: false,
    }
  }

  handleCloseModal(){
    this.setState({
      show_modal: false,
    })
  }

  handleOpenModal(){
    var result = (this.state.progress === this.state.target);
    this.setState({
      completed: true,
      show_modal: true,
      success: result,
    })
  }

  getResult() {
    var result = (this.state.success);
    if (result) {
      return (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Congratulations! You've successfully completed this step.</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => console.log("Continue to next step...")}>
              Continue
            </Button>
          </Modal.Footer>
        </div>
      );
    } else {
      return (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Failed</Modal.Title>
          </Modal.Header>
          <Modal.Body>Unfortunately, you've failed this step.</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => console.log("Reload the page...")}>
              Try Again
            </Button>
          </Modal.Footer>
        </div>
      );
    }
  }

  render() {
    return (
      <Container>
         <Row className="mt-5">
          <Col>
            <ProgressBar>
              <ProgressBar animated variant="info" now={this.state.progress} key={1} />
              <PosedProgressBar animated variant="danger" now={this.state.target - this.state.progress} key={2} pose={this.state.hint ? 'visible' : 'hidden'} />
            </ProgressBar>
          </Col>
        </Row>
        <Container>
          <Row className="mt-5">
            <Col sm={8}>
              <Row>
                <Col sm={2} className="mx-auto">
                  <Ingredient className="front img-fluid" src={this.props.ingredient_src} alt={'ingredient'} pose={this.state.pressed ? 'down' : 'up'}/>
                </Col>
              </Row>
              <Row>
                <Col sm={6} className="mx-auto">
                  <Row>
                    <Col sm={10} className="mx-auto">
                      <img className="img-fluid" src={this.props.equipment_src} alt={'equipment'} />
                    </Col>
                  </Row>
                  <Row className="filled_ingredient_row">
                    <Col sm={4} className="mx-auto">
                      <FilledIngredient className="img-fluid" src={this.props.ingredient_src} alt={'ingredient'} pose={this.state.progress > 0 ? 'visible' : 'hidden'} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col sm={2} className="mx-auto">
              <PosedH5 pose={this.state.hint ? 'visible' : 'hidden'}>Target: {this.state.target / 10}</PosedH5>
              <h5>Current: {this.state.progress / 10}</h5>
              <Row className="my-3 mt-5">
                <Repeatable
                  tag={Button}
                  variant="info"
                  disabled={this.state.completed}
                  repeatDelay={0}
                  repeatInterval={150}
                  onPress={() => {
                    this.setState({
                      pressed: true,
                      progress: Math.min(this.state.progress + 10, 100),
                    })
                  }}
                  onHoldStart={() => {
                  }}
                  onHold={() => {
                  }}
                  onHoldEnd={() => {
                  }}
                  onRelease={() => {
                    this.setState({
                      pressed: false,
                    })
                  }}
                >
                  FILL
                </Repeatable>
              </Row>
              <Row className="my-3">
                <Button variant="info"
                  onClick={() => this.handleOpenModal()}
                >COMPLETE</Button>
                <Modal show={this.state.show_modal} onHide={() => this.handleCloseModal()}>
                  <Modal.Body>{this.getResult()}</Modal.Body>
                </Modal>
              </Row>
              <Row className="my-3">
                <Button variant="info"
                  onClick={() => {
                    this.setState({
                      hint: true,
                    });
                  }}
                  disabled={this.state.hint || this.state.completed}
                >GET HINT</Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

 export class StirGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      target: this.props.target,
      pressed: false,
      completed: false,
      success: false,
      hint: false,
      show_modal: false,
    }
  }

  handleCloseModal() {
    this.setState({
      show_modal: false,
    })
  }

  handleOpenModal() {
    var result = (this.state.progress === this.state.target);
    this.setState({
      completed: true,
      show_modal: true,
      success: result,
    })
  }

  getResult() {
    var result = (this.state.success);
    if (result) {
      return (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Congratulations! You've successfully completed this step.</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => console.log("Continue to next step...")}>
              Continue
            </Button>
          </Modal.Footer>
        </div>
      );
    } else {
      return (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Failed</Modal.Title>
          </Modal.Header>
          <Modal.Body>Unfortunately, you've failed this step.</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => console.log("Reload the page...")}>
              Try Again
            </Button>
          </Modal.Footer>
        </div>
      );
    }
  }

  render() {
    return (
      <Container>
        <Row className="mt-5">
          <Col>
            <ProgressBar>
              <ProgressBar animated variant="info" now={this.state.progress} key={1} />
              <PosedProgressBar animated variant="danger" now={this.state.target - this.state.progress} key={2} pose={this.state.hint ? 'visible' : 'hidden'} />
            </ProgressBar>
          </Col>
        </Row>
        <Container>
          <Row className="mt-5">
            <Col sm={8}>
              <Row>
                <Col sm={3} className="mx-auto front">
                  <Spoon className="front img-fluid test" src={spoon_src} alt={'spoon'} pose={this.state.progress % 2 === 0 ? 'left' : 'right'} />
                </Col>
              </Row>
              <Row className="glass_stir_row">
                <Col sm={4} className="mx-auto">
                  <img className="img-fluid" src={this.props.equipment_src} alt={'equipment'} />
                </Col>
              </Row>
            </Col>
            <Col sm={2} className="mx-auto">
              <PosedH5 pose={this.state.hint ? 'visible' : 'hidden'}>Target: {this.state.target}</PosedH5>
              <h5>Current: {this.state.progress}</h5>
              <Row className="my-3 mt-5">
                <Repeatable
                  tag={Button}
                  variant="info"
                  disabled={this.state.completed}
                  repeatDelay={0}
                  repeatInterval={150}
                  onPress={() => {
                    this.setState({
                      pressed: true,
                    })
                  }}
                  onHoldStart={() => {
                  }}
                  onHold={() => {
                    this.setState({
                      progress: Math.min(this.state.progress + 1, 100)
                    });
                  }}
                  onHoldEnd={() => {
                  }}
                  onRelease={() => {
                    this.setState({
                      pressed: false,
                    })
                  }}
                >
                  STIR 
                </Repeatable>
              </Row>
              <Row className="my-3">
                <Button variant="info"
                  onClick={() => this.handleOpenModal()}
                >COMPLETE</Button>
                <Modal show={this.state.show_modal} onHide={() => this.handleCloseModal()}>
                  <Modal.Body>{this.getResult()}</Modal.Body>
                </Modal>
              </Row>
              <Row className="my-3">
                <Button variant="info"
                  onClick={() => {
                    this.setState({
                      hint: true,
                    });
                  }}
                  disabled={this.state.hint || this.state.completed}
                >GET HINT</Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export class MemoryGame extends React.Component {
  render() {
    return (
      <Container>

      </Container>
    );
  }
}

import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { bindActionCreators } from 'redux';
import * as Actions from 'store/actions';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import Accordion from "components/Accordion/Accordion.jsx";

import userProfileStyles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.jsx";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import * as service from "restful"
import avatar from "assets/img/faces/marc.jpg";
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    let profile = {}
    Object.assign(profile, props.userProfile);
    this.state = {
      profile
    };
  }
  convertValue(typeString, value) {
    var convertedValue;
    switch (typeString) {
      case "number":
        convertedValue = Number(value);
        break;
      case "string":
        convertedValue = value.toString();
        break;
      default:
        convertedValue = value.toString();
        break;
    }
    return convertedValue;
  }
  handleInputValue = event => {
    console.log(event.target.name, event.type, event.target.type)
    var { profile } = this.state;
    var value = this.convertValue(event.target.type, event.target.value)
    // var value = event.target.value
    if (event.target.name === "sex") {
      profile.athlete[event.target.name] = value;
      this.setState({ profile });
    }
    else {
      profile[event.target.name] = value
      this.setState({ profile });
    }
  }

  componentWillReceiveProps(next) {
    const { userProfile } = next;
    if (userProfile === this.props.userProfile) return;
    var { profile } = this.state
    Object.assign(profile, userProfile);
    this.setState({ profile });
  }
  updateProfile = async () => {
    const { setUserData } = this.props;
    const { profile } = this.state;
    var [response] = await Promise.all([
      service.setUserData(profile)
    ])
    if (!response.data.error)
      alert("profile update success!");
    await setUserData(this.state.profile);
    console.log("updated profile:", this.state.profile, response.data.profile);

  }
  render() {
    const { classes, currentUser } = this.props;
    const { profile } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="primary">
                  <PermIdentity />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Edit Profile - <small>Complete your profile</small>
                </h4>
              </CardHeader>

              <CardBody>
                <p></p>
                <h4 className={classes.cardIconTitle}>
                  <strong>Standard profile</strong>
                </h4>
                <GridContainer>
                  {/* first name */}
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="First Name"
                      id="first-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: (profile && profile.athlete && profile.athlete.firstname) || ""
                      }}
                    />
                  </GridItem>
                  {/* last name */}
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      id="last-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: (profile && profile.athlete && profile.athlete.lastname) || ""
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  {/* sex */}
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="sex"
                      >
                        Sex
                          </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={(profile.athlete && profile.athlete.sex) || ""}
                        onChange={this.handleInputValue}
                        inputProps={{
                          name: "sex",
                          id: "sex"
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Choose Sex
                            </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="M"
                        >
                          Male
                            </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="F"
                        >
                          Female
                            </MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  {/* age */}
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Age"
                      id="age"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "age",
                        type: "number",
                        inputProps: { min: 16, max: 100 },
                        value: profile.age || "",
                        onChange: this.handleInputValue
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  {/* height */}
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Height( cm)"
                      id="height"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "height",
                        type: "number",
                        inputProps: { min: 150, max: 300 },
                        value: profile.height || "",
                        onChange: this.handleInputValue
                      }}
                    />
                  </GridItem>
                  {/* weight */}
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Weight( kg)"
                      id="weight"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number",
                        name: "weight",
                        inputProps: { min: 40, max: 200 },
                        value: profile.weight || "",
                        onChange: this.handleInputValue
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  {/* hr threshold */}
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Heart Rate Threshold point"
                      id="HeartRateThresholdpoint"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number",
                        name: "HeartRateThresholdpoint",
                        inputProps: { min: 40, max: 200 },
                        value: profile.HeartRateThresholdpoint || "",
                        onChange: this.handleInputValue
                      }}
                    />
                  </GridItem>
                  {/* hr maximum */}
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Heart Rate Maximum"
                      id="HeartRateMaximum"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number",
                        inputProps: { min: 40, max: 200 },
                        name: "HeartRateMaximum",
                        value: profile.HeartRateMaximum || "",
                        onChange: this.handleInputValue
                      }}
                    />
                  </GridItem>
                  {/* hr restpulse */}
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Heart Rate restpulse"
                      id="HeartRaterestpulse"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number",
                        inputProps: { min: 40, max: 200 },
                        name: "HeartRaterestpulse",
                        value: profile.HeartRaterestpulse || "",
                        onChange: this.handleInputValue
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <p></p>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Accordion
                      // active={0}
                      collapses={[
                        {
                          title: "Advanced profile",
                          content:
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <GridContainer>
                                  {/* hr zone 0 min */}
                                  <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                      labelText="Heart Rate Zone 0 MIN"
                                      id="hrzone0min"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        type: "number",
                                        inputProps: { min: 40, max: 200 },
                                        name: "hrzone0min",
                                        value: profile.hrzone0min || "",
                                        onChange: this.handleInputValue
                                      }}
                                    />
                                  </GridItem>
                                  {/* hr zone 0 max */}
                                  <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                      labelText="Heart Rate Zone 0 MAX"
                                      id="hrzone0max"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        type: "number",
                                        inputProps: { min: 40, max: 200 },
                                        name: "hrzone0max",
                                        value: profile.hrzone0max || "",
                                        onChange: this.handleInputValue
                                      }}
                                    />
                                  </GridItem>
                                </GridContainer>
                                <GridContainer>
                                  {/* hr zone 1 min */}
                                  <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                      labelText="Heart Rate Zone 1 MIN"
                                      id="hrzone1min"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        type: "number",
                                        inputProps: { min: 40, max: 200 },
                                        name: "hrzone1min",
                                        value: profile.hrzone1min || "",
                                        onChange: this.handleInputValue
                                      }}
                                    />
                                  </GridItem>
                                  {/* hr zone 1 max */}
                                  <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                      labelText="Heart Rate Zone 1 MAX"
                                      id="hrzone1max"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        type: "number",
                                        inputProps: { min: 40, max: 200 },
                                        name: "hrzone1max",
                                        value: profile.hrzone1max || "",
                                        onChange: this.handleInputValue
                                      }}
                                    />
                                  </GridItem>
                                </GridContainer>
                                <GridContainer>
                                  {/* hr zone 2 min */}
                                  <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                      labelText="Heart Rate Zone 2 MIN"
                                      id="hrzone2min"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        type: "number",
                                        inputProps: { min: 40, max: 200 },
                                        name: "hrzone2min",
                                        value: profile.hrzone2min || "",
                                        onChange: this.handleInputValue
                                      }}
                                    />
                                  </GridItem>
                                  {/* hr zone 2 max */}
                                  <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                      labelText="Heart Rate Zone 2 MAX"
                                      id="hrzone2max"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        type: "number",
                                        inputProps: { min: 40, max: 200 },
                                        name: "hrzone2max",
                                        value: profile.hrzone2max || "",
                                        onChange: this.handleInputValue
                                      }}
                                    />
                                  </GridItem>
                                </GridContainer>
                                <GridContainer>
                                  {/* hr zone 3 min */}
                                  <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                      labelText="Heart Rate Zone 3 MIN"
                                      id="hrzone3min"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        type: "number",
                                        inputProps: { min: 40, max: 200 },
                                        name: "hrzone3min",
                                        value: profile.hrzone3min || "",
                                        onChange: this.handleInputValue
                                      }}
                                    />
                                  </GridItem>
                                  {/* hr zone 3 max */}
                                  <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                      labelText="Heart Rate Zone 3 MAX"
                                      id="hrzone3max"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        type: "number",
                                        inputProps: { min: 40, max: 200 },
                                        name: "hrzone3max",
                                        value: profile.hrzone3max || "",
                                        onChange: this.handleInputValue
                                      }}
                                    />
                                  </GridItem>
                                </GridContainer>
                                <GridContainer>
                                  {/* hr zone 4 min */}
                                  <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                      labelText="Heart Rate Zone 4 MIN"
                                      id="hrzone4min"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        type: "number",
                                        inputProps: { min: 40, max: 200 },
                                        name: "hrzone4min",
                                        value: profile.hrzone4min || "",
                                        onChange: this.handleInputValue
                                      }}
                                    />
                                  </GridItem>
                                  {/* hr zone 4 max */}
                                  <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                      labelText="Heart Rate Zone 4 MAX"
                                      id="hrzone4max"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        type: "number",
                                        inputProps: { min: 40, max: 200 },
                                        name: "hrzone4max",
                                        value: profile.hrzone4max || "",
                                        onChange: this.handleInputValue
                                      }}
                                    />
                                  </GridItem>
                                </GridContainer>
                                <GridContainer>
                                  {/* hr zone 5 min */}
                                  <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                      labelText="Heart Rate Zone 5 MIN"
                                      id="hrzone5min"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        type: "number",
                                        inputProps: { min: 40, max: 200 },
                                        name: "hrzone5min",
                                        value: profile.hrzone5min || "",
                                        onChange: this.handleInputValue
                                      }}
                                    />
                                  </GridItem>
                                  {/* hr zone 5 max */}
                                  <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                      labelText="Heart Rate Zone 5 MAX"
                                      id="hrzone5max"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        type: "number",
                                        inputProps: { min: 40, max: 200 },
                                        name: "hrzone5max",
                                        value: profile.hrzone5max || "",
                                        onChange: this.handleInputValue
                                      }}
                                    />
                                  </GridItem>
                                </GridContainer>
                                <GridContainer>
                                  {/* vo2 max */}
                                  <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                      labelText="VO2 Max"
                                      id="vo2max"
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      inputProps={{
                                        type: "number",
                                        inputProps: { min: 0, max: 1000 },
                                        name: "vo2max",
                                        value: profile.vo2max || "",
                                        onChange: this.handleInputValue
                                      }}

                                    />
                                  </GridItem>
                                  {/* goals for 2019 */}
                                  <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                      labelText="Goals for 2019"
                                      id="Goalsfor2019"
                                      inputProps={{
                                        name: "Goalsfor2019",
                                        value: profile.Goalsfor2019 || "",
                                        onChange: this.handleInputValue
                                      }}
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                    />
                                  </GridItem>
                                  {/* events planned for 2019 */}
                                  <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                      labelText="Events planned for 2019"
                                      id="Eventsplanned2019"
                                      inputProps={{
                                        name: "Eventsplanned2019",
                                        value: profile.Eventsplanned2019 || "",
                                        onChange: this.handleInputValue
                                      }}
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                    />
                                  </GridItem>
                                </GridContainer>
                                <GridContainer>
                                  {/* bike brand and type */}
                                  <GridItem xs={12} sm={12} md={4}>
                                    <FormControl
                                      fullWidth
                                      className={classes.selectFormControl}
                                    >
                                      <InputLabel
                                        htmlFor="bikeSelect"
                                      >
                                        Bike brand + type
                                      </InputLabel>
                                      <Select
                                        MenuProps={{
                                          className: classes.selectMenu
                                        }}
                                        classes={{
                                          select: classes.select
                                        }}
                                        value={profile.bikeSelect || ""}
                                        onChange={this.handleInputValue}
                                        inputProps={{
                                          name: "bikeSelect",
                                          id: "bikeSelect"
                                        }}
                                      >
                                        <MenuItem
                                          disabled
                                          classes={{
                                            root: classes.selectMenuItem
                                          }}
                                        >
                                          Choose Bike brand + type
                                         </MenuItem>
                                        <MenuItem
                                          classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                          }}
                                          value="0"
                                        >
                                          Brand1Type1
                                          </MenuItem>
                                        <MenuItem
                                          classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                          }}
                                          value="1"
                                        >
                                          Brand2Type1
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </GridItem>
                                  {/* do you use hr sensor */}
                                  <GridItem xs={12} sm={12} md={4}>
                                    <FormControl
                                      fullWidth
                                      className={classes.selectFormControl}
                                    >
                                      <InputLabel
                                        htmlFor="hrsensorSelect"
                                      >
                                        Do you use HR sensor?
                                      </InputLabel>
                                      <Select
                                        MenuProps={{
                                          className: classes.selectMenu
                                        }}
                                        classes={{
                                          select: classes.select
                                        }}

                                        value={profile.hrsensorSelect || ""}
                                        onChange={this.handleInputValue}
                                        inputProps={{
                                          name: "hrsensorSelect",
                                          id: "hrsensorSelect"
                                        }}
                                      >
                                        <MenuItem
                                          classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                          }}
                                          value="0"
                                        >
                                          Yes
                                          </MenuItem>
                                        <MenuItem
                                          classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                          }}
                                          value="1"
                                        >
                                          No
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </GridItem>
                                  {/* do you use powermeter */}
                                  <GridItem xs={12} sm={12} md={4}>
                                    <FormControl
                                      fullWidth
                                      className={classes.selectFormControl}
                                    >
                                      <InputLabel
                                        htmlFor="powermeterSelect"
                                      >
                                        Do you use Powermeter?
                                      </InputLabel>
                                      <Select
                                        MenuProps={{
                                          className: classes.selectMenu
                                        }}
                                        classes={{
                                          select: classes.select
                                        }}
                                        value={profile.powermeterSelect || ""}
                                        onChange={this.handleInputValue}
                                        inputProps={{
                                          name: "powermeterSelect",
                                          id: "powermeterSelect"
                                        }}
                                      >
                                        <MenuItem
                                          classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                          }}
                                          value="0"
                                        >
                                          Yes
                                          </MenuItem>
                                        <MenuItem
                                          classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                          }}
                                          value="1"
                                        >
                                          No
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </GridItem>
                                </GridContainer>
                              </GridItem>
                            </GridContainer>
                        }
                      ]}
                    />
                  </GridItem>
                </GridContainer>
                <Button color="primary" className={classes.updateProfileButton} onClick={this.updateProfile}>
                  Update Profile
                </Button>
                <Clearfix />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={currentUser ? currentUser.profile_medium : avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
                <h4 className={classes.cardTitle}>{currentUser.username || "Alec Thompson"}</h4>
                <p className={classes.description}>
                  Don't be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves Kanye
                  I love Rick Owens’ bed design but the back is...
                </p>
                <Button color="primary" round>
                  Follow
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    userProfile: state.user.userProfile,
    currentUser: state.user.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout: Actions.logout,
    setUserData: Actions.setUserData
  }, dispatch);
}

export default withStyles(Object.assign(extendedFormsStyle, userProfileStyles))(withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile)));
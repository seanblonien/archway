import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import React, {Component} from 'react';
import compose from 'recompose/compose';
import api from '../Services/api';
import LoadingCircle from '../Components/LoadingCircle';
import ProposalForm from '../Components/Proposals/ProposalForm';
import gStyle from '../utils/styles.module.css';


class ViewYourCapstonesSponsors extends Component {
  constructor(props) {
    super(props);

    // TODO add capstones
    this.state = {
      loading: true,
      proposals: []
    };
  }

  async componentDidMount() {
    const proposals = await api.proposals.find();

    this.setState({loading: false, proposals});
  }

  render() {
    const {loading, proposals} = this.state;

    if (!loading) {
      return (
        <div>
          <Grid container justify='center'>
            <Grid item md={10} xs={12}>
              <Grid container direction='row' alignItems='flex-end' justify='space-between'>
                <Grid item align='left'>
                  <Typography variant='h4' style={{marginTop: '16px'}}>Pending Company Projects</Typography>
                </Grid>
                <Grid item align='right'>
                  <ProposalForm/>
                </Grid>
              </Grid>
              <br/>
              {proposals.length > 0 &&
                <TableContainer component={Paper} className={gStyle.table}>
                  <Table aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Project title</TableCell>
                        <TableCell align='right'>Status</TableCell>
                        <TableCell align='right'>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {proposals.map((proposal, index) => (
                        <TableRow key={index}>
                          <TableCell component='th' scope='row'>
                            {proposal.projectTitle}
                          </TableCell>
                          <TableCell align='right'>{proposal.status}</TableCell>
                          <TableCell align='right'>
                            <Button>Edit</Button>
                            <Button>Delete</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              }
            </Grid>
          </Grid>

          <Grid container justify='center'>
            <Grid item md={10} xs={12}>
              <Typography variant='h4' style={{marginTop: '16px'}}>Current Company Projects</Typography>
              <Divider/>
              <br/>
            </Grid>
          </Grid>


          <Grid container justify='center'>
            <Grid item md={10} xs={12}>
              <Typography variant='h4' style={{marginTop: '16px'}}>Past Company Projects</Typography>
              <Divider/>
              <br/>
            </Grid>
          </Grid>
        </div>
      );
    }

    return <LoadingCircle/>;
  }
}

export default compose(
  withWidth(),
)(ViewYourCapstonesSponsors);

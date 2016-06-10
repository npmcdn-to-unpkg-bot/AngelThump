// A placeholder image if the user does not have one
const PLACEHOLDER = 'https://placeimg.com/60/60/people';
// An anonymous user if the message does not have that information
const dummyUser = {
  avatar: PLACEHOLDER,
  username: 'Anonymous',
  email: 'anon@example.com',
  streamkey: 'none'
};

// Establish a Socket.io connection
const socket = io();
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const app = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.hooks())
  // Use localStorage to store our login token
  .configure(feathers.authentication({
    storage: window.localStorage
  }));

const Profile = React.createClass({
  logout() {
    app.logout().then(() => window.location.href = '/index.html');
  },

  render() {
    const user = this.props.user;
    console.log('user:', user);

    return <main className="container">
      <div className="row">
        <div className="col-12 push-4-tablet col-4-tablet">
          <div className="row">
            <div className="col-12 col-8-tablet push-2-tablet text-center">
              <h3 className="title">{user.username} Profile</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div>
                <strong>Stream Key</strong>
              </div>
              <div>
                {user.streamkey}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div>
                <strong>email</strong>
              </div>
              <div>
                {user.email}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="flex flex-row flex-center">
        <a href="#" className="logout button button-primary" onClick={this.logout}>
          Sign Out
        </a>
      </footer>
    </main>

    return <aside> 
      <img src={user.avatar || PLACEHOLDER} className="avatar" />
      <span className="username font-600">{user.username}</span>
    </aside>
  }
})

const ProfileApp = React.createClass({
  getInitialState() {
    return {
      user: {}
    };
  },

  componentDidUpdate: function() {
    // Whenever something happened, scroll to the bottom of the chat window
    const node = this.getDOMNode().querySelector('.chat');
    node.scrollTop = node.scrollHeight - node.clientHeight;
  },

  componentDidMount() {
    const userService = app.service('users');
    // const messageService = app.service('messages');
    const cached_user = app.get('user'); 
    console.log(cached_user._id);

    userService.get(cached_user._id).then(user => this.setState({ user: user }))
    .catch(e => console.error(e));
  },

  render() {
    return <div>
      <Profile user={this.state.user} />
    </div>
  }
});

app.authenticate().then(() => {
  ReactDOM.render(<div id="app" className="flex flex-column">
    <header className="title-bar flex flex-row flex-center">
      <div className="title-wrapper block center-element">
        <span className="title">Profile</span>
      </div>
    </header>

    <ProfileApp />
  </div>, document.body);
}).catch(error => {
  if(error.code === 401) {
    window.location.href = '/login.html'
  }

  console.error(error);
});
import { useNavigate, useParams } from "react-router-dom";
//a wrapper function to return a hook call
//IMPORTANT: hook call must be inside the return statement
//else withNavigationParams become a functional component rather than a wrapper
//IMPORTANT: hook can not be called inside a callback
//METHOD 1: use a wrapper like below
//METHOD 2: replace class with function component
function withNavigationParams(Component) {
  return (props) => {
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component {...props} navigate={navigate} params={params} />
    );
  }
}

export default withNavigationParams;
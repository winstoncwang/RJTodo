import { useNavigate, useParams } from "react-router-dom";

function WithNavigateParams(Component) { 
    const navigation = useNavigate();
    const params = useParams();
    return (props) => { 
        return <Component {...props} navigate={ navigation } params={ params }/>
    }
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default withRouter;
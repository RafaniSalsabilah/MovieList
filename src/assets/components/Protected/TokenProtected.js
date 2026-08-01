import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function TokenProtected({ children }) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return children;
}

export default TokenProtected;
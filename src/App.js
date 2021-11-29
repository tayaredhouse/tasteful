import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import PostDetails from "./components/PostDetails/PostDetails";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      
      <Router>
        <Header/>
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:redditID" element={<PostDetails />} />
          <Route element={ <PageNotFound />} />
         </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;

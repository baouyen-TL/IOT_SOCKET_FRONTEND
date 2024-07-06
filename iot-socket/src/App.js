
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "antd/dist/reset.css";
import Home from "./pages/Home/Home";
import Question from "./pages/Question/Question";
import Statistic from "./pages/Statistic/Statistic";
import ConnectRemote from "./pages/ConnectRemote/ConnectRemote";
import Default from "./layout/Default/Default";
import TopicList from "./pages/TopicList/TopicList";
import BeginGame from "./pages/BeginGame/BeginGame";
import PlayGame from "./pages/BeginGame/PlayGame";
import Ranking from "./pages/Ranking/Ranking";
import DetailTopRanking from "./pages/Ranking/DetailTopRanking";
import EditQuestion from "./pages/Question/EditQuestion";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element = {<Default />}>
            <Route index path="/" element = {<Home />} />
            <Route path="/question" element = {<Question />} />
            <Route path="/statistic" element = {<Statistic />} />
            <Route path="/list-topic" element = {<TopicList />} />
            <Route path="/begingame/:topicid" element = {<BeginGame />} />
            <Route path="/playgame/:topicid/:beginGameId" element={<PlayGame/>}/>
            <Route path="/connect-remote" element = {<ConnectRemote />} />
            <Route path="/ranking/:beginGameId" element ={<Ranking/>}/>
            <Route path="/detailTopRanking/:beginGameId" element = {<DetailTopRanking/>}/>
            <Route path="/editquestion/:topicid" element ={<EditQuestion/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

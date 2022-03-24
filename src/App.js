import React from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Home from './components/Home';
import JobDetails from './components/JobDetails';
import SubmitProposal from './components/SubmitProposal';
import PostaJob from './components/PostaJob';
import Messages from './components/Messages';
import Settings from './components/Settings';
import JobSubmitPage from './components/JobSubmitPage';


function App() {
    return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard/:username" element={<Home />} />
            <Route path="/job/:username/:id" element={<JobDetails />} />
            <Route path="/submitProposal/:username/:id" element={<SubmitProposal />} />
            <Route path="/application/:username/:id" element={<JobDetails />} />
            <Route path="/postJob/:username" element={<PostaJob />} />
            <Route path="/messages/:username/:other" element={<Messages />} />
            <Route path="/settings/:username" element={<Settings />} />
            <Route path="/submitJob/:username/:id" element={<JobSubmitPage />} />
            <Route path="/viewSubmission/:username/:id" element={<JobSubmitPage />} />
          </Routes>
      </BrowserRouter>
    );
}

export default App;

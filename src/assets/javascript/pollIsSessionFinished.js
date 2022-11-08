/* global window */

(async function (w) {
  async function polling(apiUrl, redirectPath, timeoutPath, pollingDuration, interval, sessionId) {
    const getTimeMillis = () => {
      return new Date().getTime();
    };
  
    const pollEndTime = getTimeMillis() + +pollingDuration
    
    const url = `${apiUrl}/isSessionFinished/${sessionId}`;
    
    const config = {
      mode: "cors"
    };
    
    const poll = async function () {
      const currentTime = getTimeMillis();
      const hasTimedOut = currentTime > pollEndTime
      let response 
  
      if(!hasTimedOut) {
        response = await window.fetch(url, config)
        if (response.status === 200) {
          window.location.href = `${redirectPath}?sessionId=${sessionId}`
        } else {
          await setTimeout(poll, +interval);
        }
      } else  {
        window.location.href = timeoutPath
      }
    };
  
    await poll();
  }

  w.GOVUKFrontend.polling = polling;
})(window);

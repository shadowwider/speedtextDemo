import React from 'react';
import { Icon } from 'watson-react-components';
var messageO = '';
var flag = 0;
// reducer to convert a list of messages into a (flat) list of results
function allResultsReducer(list, message) {
  return list.concat(message.results);
}

// reducer to extract all matched keywords from a list of results
function keywordReducer(keywords, result) {
  Object.keys(result.keywords_result || {}).forEach(k => {
    keywords[k] = keywords[k] || [];
    keywords[k].push(...result.keywords_result[k]);
  });
  return keywords;
}

function getSpotted(messages) {
  if (messages.length > 0) {//只取最后一次完整的text
    if (messages.slice(-1)[0]['results'][0]['final'] === true) { // 第二个下标0可能英文时会有问题 未测试
      if (messages.slice(-1)[0]['results'][0]['alternatives'][0]['transcript'] !== messageO) {
        messageO = messages.slice(-1)[0]['results'][0]['alternatives'][0]['transcript'];
        flag = 1;
      }

      return messages.slice(-1).reduce(allResultsReducer, []).reduce(keywordReducer, {});
    } else {
      return [];
    }

  } else {
    return [];
  }

}

function options(s) {
  if ("财务" in s && "风险" in s) {
    if (flag) {
      fetch(`/api/synthesize?voice=en-US_AllisonVoice&text=I+found+4+suspected +risks +that+ you +need +to +confirm`).then((response) => {
        if (response.ok) {
          response.blob().then((blob) => {
            const audio = document.getElementById('audio');
            const url = window.URL.createObjectURL(blob);
            audio.setAttribute('src', url);
            audio.setAttribute('type', 'audio/ogg;codecs=opus');
          });
        }
      });
      flag=0;
    }

    return (
      <img id="img" src="risk.png" />
    );
  }
  else if ("报表" in s && "上个月" in s) {
    if (flag) {
      fetch(`/api/synthesize?voice=en-US_AllisonVoice&text=Your+account+total+amount+last+month+are+7589281.99+dollars`).then((response) => {
        if (response.ok) {
          response.blob().then((blob) => {
            const audio = document.getElementById('audio');
            const url = window.URL.createObjectURL(blob);
            audio.setAttribute('src', url);
            audio.setAttribute('type', 'audio/ogg;codecs=opus');
          });
        }
      });
       flag=0;
    }
    return (
      <img id="img" src="d2.png" />
    );
  }
  else if ("展示" in s && "仪表" in s && "盘" in s) {

    if (flag) {
      fetch(`/api/synthesize?voice=en-US_AllisonVoice&text=Your+account+total+amount+are+59066984.13+dollars`).then((response) => {
        if (response.ok) {
          response.blob().then((blob) => {
            const audio = document.getElementById('audio');
            const url = window.URL.createObjectURL(blob);
            audio.setAttribute('src', url);
            audio.setAttribute('type', 'audio/ogg;codecs=opus');
          });
        }
      });
       flag=0;
    }


    return (<img id="img" src="d1.png" />);

  }
  else
    return (<img id="img" src="miss.png" />)
}

function music() {

  return (
    <audio autoPlay type="audio/ogg;codecs=opus" src>
    </audio>
  );
}
export function Recon(props) {
  const notSpotted = props.isInProgress
    ? 'Not yet spotted.'
    : 'Not spotted.';
  const notSpottedIcon = props.isInProgress
    ? 'loader'
    : 'close';
  const spotted = getSpotted(props.messages);
  const audio = music();

  const imges = options(spotted);

  return (
    <div className=" _container _container_large  dashboard">
      {imges}
      <audio autoPlay="true" id="audio" >

      </audio>
    </div>
  );
}

Recon.propTypes = {
  messages: React.PropTypes.array.isRequired,
  keywords: React.PropTypes.array.isRequired,
  isInProgress: React.PropTypes.bool.isRequired,
};


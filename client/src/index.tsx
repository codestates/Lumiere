/* eslint no-multi-str: "off" */
import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      {console.log(
        '                                                                        ,,\n\
                                                                       /  ,\n\
                                                                      /   /\n\
                                                                     /   /\n\
                                                                    /   /\n\
    __________________________                                     /   /\n\
    ⎢                         ⎥                                   /   /\n\
    ⎢  혹시 내가 보여? 난 고양이야  ⎥                                  /   /\n\
    ⎢____    _________________⎥                                 /   /\n\
          \\/    ,      ,,                                      /   /\n\
               /%c@%c\\____/%c@%c \\                                ____/   /\n\
              /           \\                         _____/        /__\n\
        /" \\ / •    •      \\                     __/             /  %c@@%c"\\\n\
        \\    %c@@%c  ㅅ  %c@@%c     /___             ___/                /    _/\n\
      /" \\   \\                 \\__________/                    |__/ "\\\n\
      \\   \\                                                   /      /\n\
       \\    \\  __                                                  _/\n\
        \\                                                       __/\n\
          \\_                                             ______/\n\
             \\ ___                                     _/\n\
                    \\__                             __/\n\
                        \\_____                _____/\n\
                              \\______________/\n\
          \n',
        'color:#ff6905',
        'color:defalut',
        'color:#ff6905',
        'color:defalut',
        'color:#ff6905',
        'color:defalut',
        'color:#ff6905',
        'color:defalut',
        'color:#ff6905',
        'color:defalut',
      )}
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

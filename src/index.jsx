import React from 'react';
import {render} from 'react-dom';
import * as $ from 'jquery';
import Post from '@models/Post';
import json from './assets/data';
import xml from './assets/data.xml';
import csv from "./assets/data.csv";
import Logo from './assets/logo';
import './babel'
import './style/reset.css';
import './style/style.css';
import './style/less.less';
import "./style/sass.scss";


const post = new Post('webpack title', Logo)

// console.log('Post:', post.toString())
// console.log('JSON title:', json)
// console.log('XML', xml);
// console.log('SCV', csv)

$('pre').html(post.toString())

const App = () => (
    <div>
        This react App
    </div>
);

render(<App />, document.getElementById('react-root'))
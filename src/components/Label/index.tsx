import React from 'react';
import './Label.scss';

interface ILabel extends React.HTMLAttributes<HTMLLabelElement> {}

export default (props: ILabel) => <label className="input-label">{props.children}</label>;

import React from 'react';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';

function ShareButtons() {
  return (
    <div>
      <FacebookShareButton url={'http://example.com'} quote="Check out this amazing place!" />
      <TwitterShareButton url={'http://example.com'} title="Amazing Place!" hashtags={['travel', 'adventure']} />
      <LinkedinShareButton url={'http://example.com'} title="Amazing Place!" summary="An incredible travel destination." />
    </div>
  );
}

export default ShareButtons;
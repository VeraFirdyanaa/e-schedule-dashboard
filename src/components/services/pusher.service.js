import Pusher from 'pusher-js';

let instance = null;

export default class PusherService {
  constructor() {
    if (!instance) {
      instance = this;
    }

    this.ps = new Pusher('4a9bd45624f14eeef65e', {
      cluster: 'ap1',
      encrypted: true
    });

    this.channel = this.ps.subscribe('automation');


    return this.channel;
  }
}
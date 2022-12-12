import { Component, OnInit } from '@angular/core';
import { NodeService } from './nodeservice';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  files1: TreeNode[];
  loading: boolean;
  files2: TreeNode[];
  selectedFiles2: TreeNode;
  constructor(private nodeService: NodeService) {}

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.nodeService.getAccounts().then((files) => (this.files1 = files));
      this.loading = false;
    }, 1000);
  }

  nodeExpand(event) {
    if (event.node) {
      //in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
      if (event.node.type === 'account') {
        this.nodeService
          .getMerchants(event.node.accountNumber)
          .then((nodes) => {
            if (!nodes || nodes.length === 0) {
              console.log(nodes);
              event.node.leaf = true;
            } else {
              event.node.children = nodes;
              event.node.selectable = true;
            }
          });
      }
      if (event.node.type === 'merchant') {
        this.nodeService.getAssets(event.node.mid).then((nodes) => {
          console.log(nodes);
          if (!nodes || nodes.length === 0) {
            event.node.leaf = true;
          } else {
            event.node.children = nodes;
            event.node.selectable = true;
          }
        });
      }
    }
  }
}

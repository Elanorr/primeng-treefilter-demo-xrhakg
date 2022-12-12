import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TreeNode } from 'primeng/api';

@Injectable()
export class NodeService {
  constructor(private http: HttpClient) {}

  getFiles() {
    return this.http
      .get<any>('assets/files.json')
      .toPromise()
      .then((res) => <TreeNode[]>res.data);
  }

  getAccounts() {
    return this.http
      .get<any>('assets/accounts.json')
      .toPromise()
      .then((res) => <TreeNode[]>res.data);
  }
  getMerchants(accountNumber) {
    return this.http
      .get<any>('assets/merchants.json')
      .toPromise()
      .then((res) => <TreeNode[]>res[accountNumber]);
  }
  getAssets(mid) {
    return this.http
      .get<any>('assets/assets.json')
      .toPromise()
      .then((res) => <TreeNode[]>res[mid]);
  }
}

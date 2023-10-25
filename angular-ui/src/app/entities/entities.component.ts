import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import * as vis from 'vis';
import { EntitiesService } from './entities.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit, AfterViewInit {
  private network: any;
  documentId: any;

  constructor(
    private entitiesService: EntitiesService,
    private route: ActivatedRoute,
  ) { }

  convertNeo4jToVisData(documentId: number): Promise<any> {
    return this.entitiesService.getEntities(documentId).toPromise().then(data => {
      // Create arrays to store nodes and edges
      const nodes: {
        group: string; id: string; label: any; 
}[] = [];
      const edges: { from: string; to: any; }[] = [];

      // Define colors for word nodes and tag nodes
      const wordNodeColor = 'rgb(255, 200, 200)'; // Light Red
      const tagNodeColor = 'rgb(200, 200, 255)';  // Light Blue

      // Iterate through the Neo4j data and transform it to Vis.js format
      data.forEach((item: { word: any; tag: any; }) => {
        // Create a unique ID for each word node
        const wordNodeId = `word_${nodes.length + 1}`;

        // Determine if the tag node already exists with the same label
        const existingTagNode = nodes.find((node) => node.label === item.tag && node.group === 'tag');
        let tagNodeId;

        if (existingTagNode) {
          // Use the existing tag node's ID
          tagNodeId = existingTagNode.id;
        } else {
          // Create a unique ID for the tag node
          tagNodeId = `tag_${nodes.length + 1}`;
        }

        // Create a word node object
        const wordNode = {
          id: wordNodeId,
          label: item.word,
          group: 'word',
          color: wordNodeColor
        };

        // Create a tag node object or reuse the existing one
        const tagNode = existingTagNode || {
          id: tagNodeId,
          label: item.tag,
          group: 'tag',
          color: tagNodeColor
        };

        // Create an edge connecting the word node to the tag node
        const edge = {
          from: wordNodeId,
          to: tagNodeId
        };

        // Add the word node, tag node (if it's new), and edge to the respective arrays
        if (!existingTagNode) {
          nodes.push(tagNode);
        }
        nodes.push(wordNode);
        edges.push(edge);
      });

      // Return the nodes and edges arrays in a format suitable for Vis.js
      return {
        nodes,
        edges
      };
    });
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const container = document.getElementById('network');
    this.route.paramMap.subscribe(async (params) => {
      this.documentId = params.get('id');
      const data = await this.convertNeo4jToVisData(this.documentId);
      const options = {};
      if (container) this.network = new vis.Network(container, data, options);
    });
  }
}
import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["/post-create.component.css"]
})
export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";
  @Output() postCreated = new EventEmitter();

  onAddPost() {
    const post = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    this.postCreated.emit(post);
  }

  // enteredValue = "";
  // newPost = "No Content";
  // onAddPost() {
  // this.newPost = this.enteredValue;
  // }
  //listen to the methon on click event
  // onAddPost(postInput: HTMLTextAreaElement) {
  //   // console.dir(postInput);
  //   // this.newPost = "The user's post";
  //   this.newPost = postInput.value;
  //alert('Post clicked')
  // }
}

import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from "../post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["/post-create.component.css"]
})
export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(form: NgForm) {
    const post: Post = {
      title: form.value.title,
      content: form.value.content
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

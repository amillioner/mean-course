// import { Component, EventEmitter, Output } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
// import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["/post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  private mode: string;
  private postId: string;
  post: Post;
  // @Output() postCreated = new EventEmitter<Post>();

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.post = this.postsService.getPost(this.postId);
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // };
    // this.postsService.addPost(form.value.title, form.value.content);
    // this.postCreated.emit(post);
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

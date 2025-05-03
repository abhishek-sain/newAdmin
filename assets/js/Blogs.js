async function uploadBlog() {
  event.preventDefault();

  // Getting values from the form fields
  let title = document.getElementById("title").value;
  let metaDescription = document.getElementById("metaDescription").value;
  let author = document.getElementById("author").value;
  let image1 = document.getElementById("image1").files[0]; // Use files[0] for the image
  let content1 = document.getElementById("content1").value;
  let image2 = document.getElementById("image2").files[0]; // Use files[0] for the image
  let content2 = document.getElementById("content2").value;

  // Check if images are uploaded
  if (!image1 || !image2) {
    Swal.fire({
      title: "Missing Image!",
      text: "Please upload both images before submitting.",
      icon: "warning",
    });
    return;
  }

  // Create FormData object
  let formData = new FormData();
  formData.append("title", title);
  formData.append("metaDescription", metaDescription);
  formData.append("author", author);
  formData.append("image1", image1); // Append file1
  formData.append("content1", content1);
  formData.append("image2", image2); // Append file2
  formData.append("content2", content2);

  try {
    let response = await fetch("http://localhost:5000/api/blogs", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      Swal.fire({
        title: "Success!",
        text: "Blog post successfully added!",
        icon: "success",
      }).then(() => {
        document.getElementById("blogForm").reset(); // Reset form after success
      });
    } else {
      Swal.fire({
        title: "Failed!",
        text: "Failed to add blog post.",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      title: "Error!",
      text: "An error occurred. Please try again!",
      icon: "error",
    });
  }
}
async function fetchBlogs() {
  try {
    const response = await fetch("http://localhost:5000/api/blogs");
    const blogs = await response.json();
    const blogContainer = document.getElementById("blog-container");
    blogContainer.innerHTML = "";

    blogs.forEach((blog, index) => {
      if (index % 3 === 0) {
        const newRow = document.createElement("div");
        newRow.className = "row mb-4";
        blogContainer.appendChild(newRow);
      }

      const row = blogContainer.lastElementChild;
      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";

      col.innerHTML = `
<a href="/blog-details?id=${blog._id}" class="text-decoration-none text-dark">
  <div class="card h-100" style="border: none; transition: transform 0.3s;">
    <div style="height: 200px; overflow: hidden;">
      <img src="http://localhost:5000/${blog.image1}" 
           class="img-fluid w-100 h-100" 
           style="object-fit: cover;"
           alt="${blog.title}">
    </div>
    <div class="card-body p-3" style="height: 200px; overflow: hidden;">
      <h6 class="card-title">${blog.title}</h6>
      <small class="text-muted d-block mb-2">
        By ${blog.author} | ${new Date(blog.createdAt).toLocaleDateString()}
      </small>
      <p class="card-text" style="font-size: 0.9rem; height: calc(100% - 50px); overflow: hidden; text-align: justify;">
        ${blog.content1.substring(0, 300)}...
      </p>
    </div>
  </div>
</a>`;

      row.appendChild(col);
    });
  } catch (error) {
    console.error("Error loading blogs:", error);
  }
}
document.addEventListener("DOMContentLoaded", fetchBlogs);

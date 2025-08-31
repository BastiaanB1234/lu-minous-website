'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AdminService } from '../lib/admin';
import { getBlogPosts, getCategories } from '../lib/blog-database';
import { BlogPost, Category, Tag, WebsiteStats, CreatePostData } from '../lib/types';

interface AdminDashboardProps {
  className?: string;
}

interface PostFormData {
  title: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published';
  category_id: string;
  tags: string[];
  featured_image?: string;
}

interface CategoryFormData {
  name: string;
  description: string;
}

interface TagFormData {
  name: string;
}

export default function AdminDashboard({ className = '' }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'categories' | 'tags' | 'analytics'>('posts');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [stats, setStats] = useState<WebsiteStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [postStatusFilter, setPostStatusFilter] = useState<'all' | 'draft' | 'published'>('all');

  // Form states
  const [showPostForm, setShowPostForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showTagForm, setShowTagForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  
  // Form data
  const [postForm, setPostForm] = useState<PostFormData>({
    title: '',
    excerpt: '',
    content: '',
    status: 'draft',
    category_id: '',
    tags: [],
    featured_image: ''
  });
  
  const [categoryForm, setCategoryForm] = useState<CategoryFormData>({
    name: '',
    description: ''
  });
  
  const [tagForm, setTagForm] = useState<TagFormData>({
    name: ''
  });

  const adminService = useMemo(() => new AdminService(), []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const statsResponse = await adminService.getWebsiteStats();
      if (statsResponse.success && statsResponse.data) {
        setStats(statsResponse.data);
      }

      // Haal ALLE posts op (draft en published)
      const [publishedPosts, draftPosts] = await Promise.all([
        getBlogPosts('published'),
        getBlogPosts('draft')
      ]);
      
      // Combineer alle posts
      const allPosts = [...publishedPosts, ...draftPosts];
      setPosts(allPosts);

      // Haal categories op uit de database
      const categories = await getCategories();
      setCategories(categories);

      // Haal tags op uit de database
      const tagsResponse = await fetch('/api/blog/tags');
      if (tagsResponse.ok) {
        const tagsData = await tagsResponse.json();
        setTags(tagsData.data || []);
      }

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [adminService]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Filter posts based on status
  const filteredPosts = posts.filter(post => {
    if (postStatusFilter === 'all') return true;
    return post.status === postStatusFilter;
  });

  // Post functions
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Zorg ervoor dat tags een array van strings zijn
      const postData = {
        ...postForm,
        tags: Array.isArray(postForm.tags) ? postForm.tags : []
      };
      
      const response = await adminService.createBlogPost(postData);
      if (response.success) { setShowPostForm(false); resetPostForm(); loadData(); } else { alert('Error creating post: ' + response.error); }
    } catch (error) { console.error('Error creating post:', error); alert('Error creating post'); }
  };

  const handleEditPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    
    try {
      // Zorg ervoor dat tags een array van strings zijn
      const postData = {
        ...postForm,
        tags: Array.isArray(postForm.tags) ? postForm.tags : []
      };
      
      const response = await adminService.updateBlogPost(editingPost.id, postData);
      if (response.success) { setShowPostForm(false); resetPostForm(); loadData(); } else { alert('Error updating post: ' + response.error); }
    } catch (error) { console.error('Error updating post:', error); alert('Error updating post'); }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const response = await adminService.deleteBlogPost(postId);
      if (response.success) {
        loadData(); // Reload data
      } else {
        alert('Error deleting post: ' + response.error);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    }
  };

  const openEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content,
      status: post.status,
      category_id: post.category_id || '',
      tags: post.tags || [], // Dit is al een array van tag namen
      featured_image: post.featured_image || ''
    });
    setShowPostForm(true);
  };

  const resetPostForm = () => {
    setPostForm({
      title: '',
      excerpt: '',
      content: '',
      status: 'draft',
      category_id: '',
      tags: [], // Reset naar lege array
      featured_image: ''
    });
    setEditingPost(null);
  };

  // Category functions
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await adminService.createCategory(categoryForm);
      if (response.success) {
        setShowCategoryForm(false);
        resetCategoryForm();
        loadData();
      } else {
        alert('Error creating category: ' + response.error);
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Error creating category');
    }
  };

  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    
    try {
      const response = await adminService.updateCategory(editingCategory.id, categoryForm);
      if (response.success) {
        setShowCategoryForm(false);
        setEditingCategory(null);
        resetCategoryForm();
        loadData();
      } else {
        alert('Error updating category: ' + response.error);
      }
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Error updating category');
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    try {
      const response = await adminService.deleteCategory(categoryId);
      if (response.success) {
        loadData();
      } else {
        alert('Error deleting category: ' + response.error);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category');
    }
  };

  const openEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description || ''
    });
    setShowCategoryForm(true);
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: '',
      description: ''
    });
    setEditingCategory(null);
  };

  // Tag functions
  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await adminService.createTag(tagForm);
      if (response.success) {
        setShowTagForm(false);
        resetTagForm();
        loadData();
      } else {
        alert('Error creating tag: ' + response.error);
      }
    } catch (error) {
      console.error('Error creating tag:', error);
      alert('Error creating tag');
    }
  };

  const handleEditTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTag) return;
    
    try {
      const response = await adminService.updateTag(editingTag.id, tagForm);
      if (response.success) {
        setShowTagForm(false);
        setEditingTag(null);
        resetTagForm();
        loadData();
      } else {
        alert('Error updating tag: ' + response.error);
      }
    } catch (error) {
      console.error('Error updating tag:', error);
      alert('Error updating tag');
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    if (!confirm('Are you sure you want to delete this tag?')) return;
    
    try {
      const response = await adminService.deleteTag(tagId);
      if (response.success) {
        loadData();
      } else {
        alert('Error deleting tag: ' + response.error);
      }
    } catch (error) {
      console.error('Error deleting tag:', error);
      alert('Error deleting tag');
    }
  };

  const openEditTag = (tag: Tag) => {
    setEditingTag(tag);
    setTagForm({
      name: tag.name
    });
    setShowTagForm(true);
  };

  const resetTagForm = () => {
    setTagForm({
      name: ''
    });
    setEditingTag(null);
  };

  // Image upload function
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('slug', postForm.title.toLowerCase().replace(/\s+/g, '-'));

    try {
      const response = await fetch('/api/blog/upload-image', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setPostForm(prev => ({
          ...prev,
          featured_image: data.url
        }));
      } else {
        alert('Error uploading image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };

  // Render functions
  const renderPostForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          {editingPost ? 'Edit Post' : 'Create New Post'}
        </h2>
        <form onSubmit={editingPost ? handleEditPost : handleCreatePost} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={postForm.title}
              onChange={(e) => setPostForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea
              value={postForm.excerpt}
              onChange={(e) => setPostForm(prev => ({ ...prev, excerpt: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              value={postForm.content}
              onChange={(e) => setPostForm(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={10}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={postForm.status}
                onChange={(e) => setPostForm(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={postForm.category_id}
                onChange={(e) => setPostForm(prev => ({ ...prev, category_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (selecteer uit bestaande tags)</label>
            <select
              multiple
              value={postForm.tags}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                setPostForm(prev => ({ ...prev, tags: selectedOptions }));
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              size={4}
            >
              {tags.map(tag => (
                <option key={tag.id} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Houd Ctrl/Cmd ingedrukt om meerdere tags te selecteren
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {postForm.featured_image && (
              <div className="mt-2">
                <img 
                  src={postForm.featured_image} 
                  alt="Featured" 
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowPostForm(false);
                resetPostForm();
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingPost ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderCategoryForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {editingCategory ? 'Edit Category' : 'Create New Category'}
        </h2>
        <form onSubmit={editingCategory ? handleEditCategory : handleCreateCategory} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={categoryForm.name}
              onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={categoryForm.description}
              onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowCategoryForm(false);
                resetCategoryForm();
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingCategory ? 'Update Category' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderTagForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {editingTag ? 'Edit Tag' : 'Create New Tag'}
        </h2>
        <form onSubmit={editingTag ? handleEditTag : handleCreateTag} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={tagForm.name}
              onChange={(e) => setTagForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowTagForm(false);
                resetTagForm();
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingTag ? 'Update Tag' : 'Create Tag'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderPostsTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Blog Posts ({filteredPosts.length})</h3>
        <div className="flex space-x-3">
          <select
            value={postStatusFilter}
            onChange={(e) => setPostStatusFilter(e.target.value as 'all' | 'draft' | 'published')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Posts</option>
            <option value="draft">Drafts</option>
            <option value="published">Published</option>
          </select>
          <button
            onClick={() => setShowPostForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <span className="mr-2">+</span>
            New Post
        </button>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : filteredPosts.length > 0 ? (
        <div className="space-y-4">
          {filteredPosts.map((post) => {
            const category = categories.find(cat => cat.id === post.category_id);
            return (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">{post.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status}
                    </span>
                      <span>Category: {category?.name || 'N/A'}</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => openEditPost(post)}
                      className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No posts found.
      </div>
      )}
    </div>
  );

  const renderCategoriesTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Categories ({categories.length})</h3>
        <button
          onClick={() => setShowCategoryForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + New Category
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : categories.length > 0 ? (
        <div className="space-y-4">
        {categories.map((category) => (
            <div key={category.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">{category.name}</h4>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => openEditCategory(category)}
                    className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    Delete
                  </button>
                </div>
            </div>
          </div>
        ))}
      </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No categories found.
        </div>
      )}
    </div>
  );

  const renderTagsTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Tags ({tags.length})</h3>
        <button
          onClick={() => setShowTagForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + New Tag
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : tags.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tags.map((tag) => (
            <div key={tag.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">{tag.name}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditTag(tag)}
                    className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTag(tag.id)}
                    className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No tags found.
      </div>
      )}
    </div>
  );

  const renderAnalyticsTab = () => (
    <div>
      <h3 className="text-xl font-semibold mb-6">Analytics</h3>
      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-2">Total Posts</h4>
            <p className="text-3xl font-bold text-blue-600">{stats.totalPosts}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-2">Published Posts</h4>
            <p className="text-3xl font-bold text-green-600">{stats.publishedPosts}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-2">Draft Posts</h4>
            <p className="text-3xl font-bold text-yellow-600">{stats.draftPosts}</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No analytics data available.
        </div>
      )}
    </div>
  );

  return (
    <div className={`bg-gray-50 min-h-screen ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your blog content and view analytics</p>
        </div>

        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'posts', label: 'Posts' },
              { id: 'categories', label: 'Categories' },
              { id: 'tags', label: 'Tags' },
              { id: 'analytics', label: 'Analytics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'posts' | 'categories' | 'tags' | 'analytics')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
            {activeTab === 'posts' && renderPostsTab()}
            {activeTab === 'categories' && renderCategoriesTab()}
            {activeTab === 'tags' && renderTagsTab()}
            {activeTab === 'analytics' && renderAnalyticsTab()}
          </div>
        
        {showPostForm && renderPostForm()}
        {showCategoryForm && renderCategoryForm()}
        {showTagForm && renderTagForm()}
      </div>
    </div>
  );
}

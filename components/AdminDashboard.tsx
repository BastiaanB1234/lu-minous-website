'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AdminService } from '../lib/admin';
import { getBlogPosts } from '../lib/blog-database';
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
    tags: []
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

      const blogPosts = await getBlogPosts();
      setPosts(blogPosts);

      // Haal echte categories op uit de database
      const categoriesResponse = await fetch('/api/blog/categories');
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData.data || []);
      }

      // Haal echte tags op uit de database
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

  // Post functions
  const handleCreatePost = async () => {
    try {
      const postData: CreatePostData = {
        title: postForm.title,
        excerpt: postForm.excerpt,
        content: postForm.content,
        status: postForm.status,
        category_id: postForm.category_id || undefined,
        tags: postForm.tags
      };

      const response = await adminService.createBlogPost(postData);
      if (response.success) {
        setShowPostForm(false);
        resetPostForm();
        loadData(); // Reload data
      } else {
        alert('Error creating post: ' + response.error);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post');
    }
  };

  const handleEditPost = async () => {
    if (!editingPost) return;
    
    try {
      const postData: Partial<CreatePostData> = {
        title: postForm.title,
        excerpt: postForm.excerpt,
        content: postForm.content,
        status: postForm.status,
        category_id: postForm.category_id || undefined,
        tags: postForm.tags
      };

      const response = await adminService.updateBlogPost(editingPost.id, postData);
      if (response.success) {
        setShowPostForm(false);
        setEditingPost(null);
        resetPostForm();
        loadData(); // Reload data
      } else {
        alert('Error updating post: ' + response.error);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error updating post');
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Weet je zeker dat je deze post wilt verwijderen?')) return;
    
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
      tags: post.tags || []
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
      tags: []
    });
    setEditingPost(null);
  };

  // Category functions
  const handleCreateCategory = async () => {
    try {
      const response = await adminService.createCategory(categoryForm);
      if (response.success) {
        setShowCategoryForm(false);
        resetCategoryForm();
        loadData(); // Reload data
      } else {
        alert('Error creating category: ' + response.error);
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Error creating category');
    }
  };

  const handleEditCategory = async () => {
    if (!editingCategory) return;
    
    try {
      const response = await adminService.updateCategory(editingCategory.id, categoryForm);
      if (response.success) {
        setShowCategoryForm(false);
        setEditingCategory(null);
        resetCategoryForm();
        loadData(); // Reload data
      } else {
        alert('Error updating category: ' + response.error);
      }
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Error updating category');
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Weet je zeker dat je deze categorie wilt verwijderen?')) return;
    
    try {
      const response = await adminService.deleteCategory(categoryId);
      if (response.success) {
        loadData(); // Reload data
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
  const handleCreateTag = async () => {
    try {
      const response = await adminService.createTag(tagForm);
      if (response.success) {
        setShowTagForm(false);
        resetTagForm();
        loadData(); // Reload data
      } else {
        alert('Error creating tag: ' + response.error);
      }
    } catch (error) {
      console.error('Error creating tag:', error);
      alert('Error creating tag');
    }
  };

  const handleEditTag = async () => {
    if (!editingTag) return;
    
    try {
      const response = await adminService.updateTag(editingTag.id, tagForm);
      if (response.success) {
        setShowTagForm(false);
        setEditingTag(null);
        resetTagForm();
        loadData(); // Reload data
      } else {
        alert('Error updating tag: ' + response.error);
      }
    } catch (error) {
      console.error('Error updating tag:', error);
      alert('Error updating tag');
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    if (!confirm('Weet je zeker dat je deze tag wilt verwijderen?')) return;
    
    try {
      const response = await adminService.deleteTag(tagId);
      if (response.success) {
        loadData(); // Reload data
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

  const renderPostForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">
          {editingPost ? 'Edit Post' : 'Create New Post'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={postForm.title}
              onChange={(e) => setPostForm({...postForm, title: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Excerpt</label>
            <textarea
              value={postForm.excerpt}
              onChange={(e) => setPostForm({...postForm, excerpt: e.target.value})}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={postForm.content}
              onChange={(e) => setPostForm({...postForm, content: e.target.value})}
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={postForm.status}
              onChange={(e) => setPostForm({...postForm, status: e.target.value as 'draft' | 'published'})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={postForm.category_id}
              onChange={(e) => setPostForm({...postForm, category_id: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
            <input
              type="text"
              value={postForm.tags.join(', ')}
              onChange={(e) => setPostForm({...postForm, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
              placeholder="liefde, verbinding, groei"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => {
              setShowPostForm(false);
              resetPostForm();
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={editingPost ? handleEditPost : handleCreatePost}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {editingPost ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderCategoryForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {editingCategory ? 'Edit Category' : 'Create New Category'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={categoryForm.description}
              onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => {
              setShowCategoryForm(false);
              resetCategoryForm();
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={editingCategory ? handleEditCategory : handleCreateCategory}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {editingCategory ? 'Update Category' : 'Create Category'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderTagForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {editingTag ? 'Edit Tag' : 'Create New Tag'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={tagForm.name}
              onChange={(e) => setTagForm({...tagForm, name: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => {
              setShowTagForm(false);
              resetTagForm();
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={editingTag ? handleEditTag : handleCreateTag}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {editingTag ? 'Update Tag' : 'Create Tag'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderPostsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Blog Posts ({posts.length})</h3>
        <button 
          onClick={() => setShowPostForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + New Post
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tags
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  {loading ? 'Loading posts...' : 'No posts yet. Create your first blog post!'}
                </td>
              </tr>
            ) : (
              posts.map((post) => {
                const category = categories.find(cat => cat.id === post.category_id);
                return (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                      <div className="text-sm text-gray-500">{post.excerpt}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        post.status === 'published' ? 'bg-green-100 text-green-800' :
                        post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {category ? category.name : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {post.tags && post.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">Geen tags</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => openEditPost(post)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCategoriesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Categories ({categories.length})</h3>
        <button 
          onClick={() => setShowCategoryForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + New Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            {loading ? 'Loading categories...' : 'No categories yet. Create your first category!'}
          </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-semibold text-gray-900">{category.name}</h4>
              <p className="text-gray-600 mt-2">{category.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {posts.filter(post => post.category_id === category.id).length} posts
                </span>
                <div className="space-x-2">
                  <button 
                    onClick={() => openEditCategory(category)}
                    className="text-indigo-600 hover:text-indigo-900 text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderTagsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Tags ({tags.length})</h3>
        <button 
          onClick={() => setShowTagForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + New Tag
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tags.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            {loading ? 'Loading tags...' : 'No tags yet. Create your first tag!'}
          </div>
        ) : (
          tags.map((tag) => (
            <div key={tag.id} className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-semibold text-gray-900">{tag.name}</h4>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {posts.filter(post => post.tags && post.tags.includes(tag.name)).length} posts
                </span>
                <div className="space-x-2">
                  <button 
                    onClick={() => openEditTag(tag)}
                    className="text-indigo-600 hover:text-indigo-900 text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteTag(tag.id)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Website Analytics</h3>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading analytics...</p>
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Posts</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalPosts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Views</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalViews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Categories</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalCategories}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Tags</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalTags}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No analytics data available.</p>
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
      </div>

      {/* Modals */}
      {showPostForm && renderPostForm()}
      {showCategoryForm && renderCategoryForm()}
      {showTagForm && renderTagForm()}
    </div>
  );
}

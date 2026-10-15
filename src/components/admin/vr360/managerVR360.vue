<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6 text-gray-800">
    <!-- Breadcrumb -->
    <nav class="bg-white rounded-xl shadow-xs p-3 mb-6 border border-gray-100">
      <ol class="flex items-center space-x-2 text-sm">
        <li>
          <router-link to="/admin" class="text-blue-600 hover:text-blue-800 flex items-center font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Trang quản trị
          </router-link>
        </li>
        <li class="text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </li>
        <li class="text-gray-600 font-semibold">Quản lý VR360</li>
      </ol>
    </nav>

    <!-- Header Banner -->
    <div class="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-2xl shadow-lg p-6 mb-6 text-white">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold tracking-tight">Quản lý Không gian VR360</h1>
              <p class="text-blue-100 text-sm mt-0.5">Trải nghiệm thực tế ảo 360°, sắp xếp thứ tự và đặt điểm chuyển phòng (Hotspot) trực quan.</p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3" v-if="selectedBuildingId">
          <button
            type="button"
            @click="openAddSceneModal"
            class="inline-flex items-center px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Thêm Scene Mới
          </button>

          <button
            type="button"
            @click="openFullTourModal"
            :disabled="vrScenes.length === 0"
            class="inline-flex items-center px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-medium text-sm border border-white/30 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Xem Tour VR
          </button>
        </div>
      </div>
    </div>

    <!-- Building Selection Card -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        <div class="lg:col-span-5">
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">
            Chọn tòa nhà quản lý <span class="text-rose-500">*</span>
          </label>
          <div class="relative">
            <select
              v-model="selectedBuildingId"
              @change="onBuildingChange"
              class="block w-full pl-3.5 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
              <option value="">--- Chọn tòa nhà cần cấu hình VR360 ---</option>
              <option v-for="b in buildings" :key="b.id" :value="b.id">
                {{ b.nameBuilding || b.name }} - {{ b.address || 'Chưa cập nhật địa chỉ' }}
              </option>
            </select>
          </div>
        </div>

        <div class="lg:col-span-7" v-if="selectedBuilding">
          <div class="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 class="text-base font-semibold text-gray-900">{{ selectedBuilding.nameBuilding || selectedBuilding.name }}</h3>
                <p class="text-xs text-gray-500 flex items-center mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ selectedBuilding.address }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                <span class="w-2 h-2 rounded-full bg-blue-600 mr-1.5 animate-pulse"></span>
                {{ vrScenes.length }}/10 Scene
              </span>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                {{ totalHotspotsCount }} Hotspots
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State when no building selected -->
    <div v-if="!selectedBuildingId" class="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-xs">
      <div class="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <h3 class="text-lg font-bold text-gray-800 mb-1">Vui lòng chọn tòa nhà</h3>
      <p class="text-sm text-gray-500 max-w-md mx-auto">Chọn một tòa nhà từ danh sách trên để xem các không gian VR360 hiện có, tải lên ảnh mới hoặc cấu hình Hotspots.</p>
    </div>

    <!-- Main Content when building selected -->
    <div v-else class="space-y-6">
      <!-- Tabs Navigation -->
      <div class="flex items-center justify-between border-b border-gray-200 pb-3">
        <div class="flex space-x-2">
          <button
            type="button"
            @click="activeTab = 'scenes'"
            :class="[
              'px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2',
              activeTab === 'scenes'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Danh sách Scenes ({{ vrScenes.length }})
          </button>

          <button
            type="button"
            @click="switchToHotspotStudio"
            :disabled="vrScenes.length === 0"
            :class="[
              'px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
              activeTab === 'studio'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            Studio Đặt Hotspot Trực Quan
          </button>
        </div>

        <button
          v-if="activeTab === 'scenes'"
          type="button"
          @click="openAddSceneModal"
          class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Thêm scene
        </button>
      </div>

      <!-- TAB 1: SCENES LIST -->
      <div v-show="activeTab === 'scenes'">
        <!-- Empty scenes state -->
        <div v-if="vrScenes.length === 0" class="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h4 class="text-lg font-bold text-gray-800 mb-1">Chưa có ảnh VR360 nào</h4>
          <p class="text-sm text-gray-500 max-w-md mx-auto mb-5">Tải lên hình ảnh 360 độ đầu tiên (phòng khách, sảnh chính, phòng họp...) để bắt đầu tạo tour ảo.</p>
          <button
            type="button"
            @click="openAddSceneModal"
            class="inline-flex items-center px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-sm transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Tải lên Scene đầu tiên
          </button>
        </div>

        <!-- Scenes Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(scene, idx) in sortedScenes"
            :key="scene.id"
            class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group">
            <!-- Scene Thumbnail Preview -->
            <div class="relative aspect-video bg-gray-900 overflow-hidden">
              <img
                :src="scene.imageUrl"
                :alt="scene.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                @error="handleImageError" />

              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              <!-- Top Badges -->
              <div class="absolute top-3 left-3 flex items-center gap-2">
                <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-black/60 text-white backdrop-blur-md border border-white/20">
                  #{{ idx + 1 }}
                </span>
                <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-600/90 text-white backdrop-blur-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  {{ (scene.hotspots && scene.hotspots.length) || 0 }} Hotspots
                </span>
              </div>

              <!-- Title overlay at bottom of image -->
              <div class="absolute bottom-3 left-3 right-3 text-white">
                <h4 class="text-base font-bold truncate">{{ scene.name }}</h4>
                <p class="text-xs text-gray-200 truncate mt-0.5" :title="scene.description">
                  {{ scene.description || 'Chưa có mô tả' }}
                </p>
              </div>
            </div>

            <!-- Card Body & Action Buttons -->
            <div class="p-4 flex-1 flex flex-col justify-between space-y-4">
              <!-- Reorder & Metadata bar -->
              <div class="flex items-center justify-between text-xs text-gray-500">
                <span class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  Thứ tự: {{ scene.sortOrder || (idx + 1) }}
                </span>

                <!-- Reorder buttons -->
                <div class="flex items-center space-x-1">
                  <button
                    type="button"
                    @click="moveScene(scene, -1)"
                    :disabled="idx === 0"
                    title="Di chuyển lên trước"
                    class="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    @click="moveScene(scene, 1)"
                    :disabled="idx === sortedScenes.length - 1"
                    title="Di chuyển xuống sau"
                    class="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Main action row -->
              <div class="grid grid-cols-12 gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  @click="openHotspotStudioForScene(scene)"
                  class="col-span-8 inline-flex items-center justify-center px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  Đặt Hotspots ({{ (scene.hotspots && scene.hotspots.length) || 0 }})
                </button>

                <button
                  type="button"
                  @click="openEditSceneModal(scene)"
                  title="Chỉnh sửa thông tin"
                  class="col-span-2 inline-flex items-center justify-center p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>

                <button
                  type="button"
                  @click="openDeleteSceneModal(scene)"
                  title="Xóa scene"
                  class="col-span-2 inline-flex items-center justify-center p-2 rounded-xl border border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: VISUAL HOTSPOT STUDIO -->
      <div v-show="activeTab === 'studio'" class="space-y-4">
        <!-- Studio Notice Banner -->
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-amber-900">
          <div class="p-2 bg-amber-100 rounded-xl text-amber-600 shrink-0 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="text-xs md:text-sm">
            <strong class="font-bold">Cách thêm Hotspot trực quan:</strong>
            Xoay góc nhìn 360° đến cửa ra vào hoặc lối đi bạn muốn kết nối, sau đó 
            <span class="font-semibold underline decoration-amber-500">click chuột trực tiếp vào vị trí đó trên ảnh</span>. 
            Hệ thống sẽ tự động bắt tọa độ (Pitch/Yaw) và hiển thị hộp thoại để bạn chọn phòng kết nối!
          </div>
        </div>

        <!-- Studio Grid Layout (Viewer + Hotspot List) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <!-- Left: Pannellum 360 Editor Viewer (lg:col-span-8) -->
          <div class="lg:col-span-8 bg-black rounded-2xl overflow-hidden shadow-lg border border-gray-800 relative">
            <div class="bg-gray-900 px-4 py-2.5 flex items-center justify-between text-xs text-gray-300 border-b border-gray-800">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="font-semibold text-white">Chế độ Đặt Hotspot Trực Quan</span>
                <span class="text-gray-400">|</span>
                <span class="text-gray-300">Click chuột lên ảnh để tạo điểm nối</span>
              </div>

              <div class="flex items-center gap-2">
                <button
                  type="button"
                  @click="reloadIframeScenes"
                  title="Tải lại tour"
                  class="px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 flex items-center gap-1 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Làm mới
                </button>
              </div>
            </div>

            <!-- Iframe Container -->
            <div class="w-full h-[540px] md:h-[620px] relative bg-gray-950">
              <iframe
                ref="vrIframe"
                :src="studioIframeUrl"
                class="w-full h-full border-0"
                allowfullscreen>
              </iframe>
            </div>
          </div>

          <!-- Right: Active Scene Inspector & Hotspots List (lg:col-span-4) -->
          <div class="lg:col-span-4 space-y-4">
            <!-- Scene Picker Card -->
            <div class="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs">
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Đang xem / Chọn Scene kiểm tra
              </label>
              <select
                v-model="studioActiveSceneId"
                @change="onStudioSceneChange"
                class="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option v-for="sc in sortedScenes" :key="sc.id" :value="sc.id">
                  {{ sc.name }} ({{ (sc.hotspots && sc.hotspots.length) || 0 }} hotspots)
                </option>
              </select>
            </div>

            <!-- Current Scene Hotspots List -->
            <div class="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs">
              <div class="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <div class="flex items-center gap-2">
                  <h4 class="font-bold text-gray-900 text-sm">Điểm nối (Hotspots) của scene</h4>
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                    {{ currentStudioSceneHotspots.length }}
                  </span>
                </div>
              </div>

              <!-- Hotspot items -->
              <div v-if="currentStudioSceneHotspots.length === 0" class="py-8 text-center text-gray-400">
                <div class="w-12 h-12 mx-auto rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <p class="text-xs font-medium text-gray-500">Scene này chưa có điểm kết nối nào</p>
                <p class="text-[11px] text-gray-400 mt-1">Click vào ảnh bên cạnh để tạo điểm đầu tiên!</p>
              </div>

              <div v-else class="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                <div
                  v-for="hs in currentStudioSceneHotspots"
                  :key="hs.id"
                  class="p-3 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-blue-50/50 hover:border-blue-200 transition-all flex items-start justify-between gap-3">
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                      <span class="text-blue-600">➔</span>
                      <span class="truncate">{{ hs.targetSceneName || getSceneNameById(hs.targetSceneId) }}</span>
                    </div>
                    <p class="text-xs text-gray-600 truncate mt-0.5 font-medium">
                      "{{ hs.text || 'Chuyển cảnh' }}"
                    </p>
                    <div class="flex items-center gap-2 mt-1.5 text-[11px] text-gray-400 font-mono">
                      <span>P: {{ hs.pitch }}°</span>
                      <span>•</span>
                      <span>Y: {{ hs.yaw }}°</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    @click="deleteHotspot(hs)"
                    title="Xóa hotspot này"
                    class="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== MODALS ==================== -->

    <!-- 1. MODAL: Thêm Scene Mới -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 animate-scale-up">
        <div class="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
          <h3 class="text-lg font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Thêm Scene VR360 Mới
          </h3>
          <button @click="showAddModal = false" class="text-white/80 hover:text-white transition-all text-xl font-bold">
            &times;
          </button>
        </div>

        <form @submit.prevent="submitAddScene" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">
              Tên phòng / Scene <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="newSceneForm.name"
              type="text"
              required
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ví dụ: Sảnh chính, Phòng khách 301, Ban công..." />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Mô tả ngắn (tùy chọn)</label>
            <input
              v-model="newSceneForm.description"
              type="text"
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ví dụ: Hướng nhìn sông Sài Gòn, sàn lát gỗ cao cấp..." />
          </div>

          <!-- File upload zone -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">
              File ảnh 360 độ Panorama <span class="text-rose-500">*</span>
            </label>
            <div
              @click="$refs.sceneFileInput.click()"
              class="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-2xl p-5 text-center cursor-pointer transition-all bg-gray-50/50 hover:bg-blue-50/30">
              <input
                ref="sceneFileInput"
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                class="hidden"
                @change="onFileSelected" />

              <div v-if="newSceneForm.preview" class="space-y-3">
                <img :src="newSceneForm.preview" alt="Preview" class="w-full h-36 object-cover rounded-xl shadow-xs" />
                <p class="text-xs font-semibold text-emerald-600 flex items-center justify-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ newSceneForm.file?.name }} ({{ formatFileSize(newSceneForm.file?.size) }})
                </p>
                <p class="text-[11px] text-gray-400">Click để đổi ảnh khác</p>
              </div>

              <div v-else class="space-y-2 py-4">
                <div class="w-12 h-12 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p class="text-sm font-semibold text-gray-700">Click để chọn file ảnh Panorama</p>
                <p class="text-xs text-gray-400">Định dạng JPG, PNG (tỷ lệ 2:1 khuyên dùng, tối đa 20MB)</p>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              @click="showAddModal = false"
              class="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-100 transition-all">
              Hủy bỏ
            </button>
            <button
              type="submit"
              :disabled="isUploading || !newSceneForm.file || !newSceneForm.name"
              class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              <svg v-if="isUploading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isUploading ? 'Đang tải lên...' : 'Tải lên Scene' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 2. MODAL: Thêm Hotspot (Kích hoạt khi click vào ảnh trong Pannellum) -->
    <div
      v-if="showAddHotspotModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 animate-scale-up">
        <div class="px-5 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
          <h3 class="text-base font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            Tạo Điểm Nối Chuyển Phòng (Hotspot)
          </h3>
          <button @click="showAddHotspotModal = false" class="text-white/80 hover:text-white transition-all text-xl font-bold">
            &times;
          </button>
        </div>

        <form @submit.prevent="submitAddHotspot" class="p-5 space-y-4">
          <!-- Coordinates & Source Scene Info -->
          <div class="bg-blue-50/70 border border-blue-100 rounded-xl p-3 text-xs space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-gray-600 font-medium">Từ scene nguồn:</span>
              <span class="font-bold text-gray-900">{{ currentClickSourceSceneName }}</span>
            </div>
            <div class="flex items-center justify-between font-mono">
              <span class="text-gray-600">Tọa độ đã bắt:</span>
              <span class="font-semibold text-blue-700">Pitch: {{ newHotspotForm.pitch }}° | Yaw: {{ newHotspotForm.yaw }}°</span>
            </div>
          </div>

          <!-- Target Scene Select -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">
              Phòng đích chuyển tới <span class="text-rose-500">*</span>
            </label>
            <select
              v-model="newHotspotForm.targetSceneId"
              required
              @change="onTargetSceneChanged"
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">--- Chọn phòng chuyển đến ---</option>
              <option
                v-for="s in candidateTargetScenes"
                :key="s.id"
                :value="s.id">
                {{ s.name }}
              </option>
            </select>
          </div>

          <!-- Label Tooltip -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">
              Nhãn hiển thị khi di chuột (Tooltip)
            </label>
            <input
              v-model="newHotspotForm.text"
              type="text"
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ví dụ: Đi sang Phòng Khách, Lên Tầng 2..." />
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              @click="showAddHotspotModal = false"
              class="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-100 transition-all">
              Hủy
            </button>
            <button
              type="submit"
              :disabled="!newHotspotForm.targetSceneId || isSavingHotspot"
              class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="isSavingHotspot" class="animate-spin text-sm">⏳</span>
              <span>Lưu Hotspot</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 3. MODAL: Chỉnh sửa Scene Info -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 animate-scale-up">
        <div class="px-5 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
          <h3 class="text-base font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Chỉnh sửa Scene
          </h3>
          <button @click="showEditModal = false" class="text-white/80 hover:text-white transition-all text-xl font-bold">
            &times;
          </button>
        </div>

        <form @submit.prevent="submitEditScene" class="p-5 space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">
              Tên phòng / Scene <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="editingSceneForm.name"
              type="text"
              required
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Mô tả ngắn</label>
            <textarea
              v-model="editingSceneForm.description"
              rows="3"
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập mô tả về không gian..."></textarea>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              @click="showEditModal = false"
              class="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-100 transition-all">
              Hủy
            </button>
            <button
              type="submit"
              :disabled="isUpdatingScene || !editingSceneForm.name"
              class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 disabled:opacity-50">
              <span v-if="isUpdatingScene" class="animate-spin text-sm">⏳</span>
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 4. MODAL: Xác nhận xóa Scene -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center border border-gray-100 animate-scale-up">
        <div class="w-14 h-14 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h4 class="text-lg font-bold text-gray-900 mb-1">Xác nhận xóa Scene?</h4>
        <p class="text-sm text-gray-500 mb-4">
          Scene <strong class="text-gray-800">"{{ sceneToDelete?.name }}"</strong> và tất cả các liên kết hotspot sẽ bị xóa hoàn toàn. Thao tác không thể hoàn tác.
        </p>

        <div class="flex items-center justify-center gap-3">
          <button
            type="button"
            @click="showDeleteModal = false"
            class="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-100 transition-all">
            Hủy bỏ
          </button>
          <button
            type="button"
            @click="confirmDeleteScene"
            :disabled="isDeleting"
            class="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 disabled:opacity-50">
            <span v-if="isDeleting" class="animate-spin text-sm">⏳</span>
            <span>Xóa vĩnh viễn</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 5. MODAL: Fullscreen VR Tour Preview -->
    <div
      v-if="showFullTourModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div class="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden border border-gray-800 animate-scale-up">
        <!-- Modal Header -->
        <div class="px-5 py-3.5 bg-gray-950 border-b border-gray-800 text-white flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-bold">{{ selectedBuilding?.nameBuilding || selectedBuilding?.name }} - Tour VR360</h3>
              <p class="text-[11px] text-gray-400">Chế độ trải nghiệm người dùng thực tế</p>
            </div>
          </div>

          <button
            type="button"
            @click="showFullTourModal = false"
            class="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Iframe Viewer Body -->
        <div class="flex-1 bg-black relative">
          <iframe
            :src="fullTourIframeUrl"
            class="w-full h-full border-0"
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  name: "Vr360Manager",
  props: {
    buildingId: {
      type: [String, Number],
      default: null
    }
  },
  emits: ['vr-scenes-updated'],
  data() {
    return {
      toast: useToast(),
      buildings: [],
      selectedBuildingId: this.buildingId || this.$route?.query?.buildingId || "",
      selectedBuilding: null,
      vrScenes: [],

      // Active Tab: 'scenes' | 'studio'
      activeTab: 'scenes',

      // Modals
      showAddModal: false,
      showAddHotspotModal: false,
      showEditModal: false,
      showDeleteModal: false,
      showFullTourModal: false,

      // Form state: Add Scene
      newSceneForm: {
        name: "",
        description: "",
        file: null,
        preview: null
      },
      isUploading: false,

      // Form state: Add Hotspot (captured via postMessage from iframe)
      newHotspotForm: {
        sceneId: null,
        targetSceneId: "",
        text: "",
        pitch: 0,
        yaw: 0
      },
      isSavingHotspot: false,

      // Form state: Edit Scene
      editingSceneForm: {
        id: null,
        name: "",
        description: "",
        sortOrder: 1
      },
      isUpdatingScene: false,

      // Delete state
      sceneToDelete: null,
      isDeleting: false,

      // Studio state
      studioActiveSceneId: null,

      defaultVrImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%231e293b'/%3E%3Ctext x='200' y='105' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%2394a3b8'%3EVR 360 Panorama%3C/text%3E%3C/svg%3E"
    };
  },
  computed: {
    sortedScenes() {
      return [...this.vrScenes].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    },
    totalHotspotsCount() {
      return this.vrScenes.reduce((sum, sc) => sum + (sc.hotspots ? sc.hotspots.length : 0), 0);
    },
    studioIframeUrl() {
      if (!this.selectedBuildingId) return "";
      return `/vtour/pannellum.html?buildingId=${this.selectedBuildingId}&edit=1`;
    },
    fullTourIframeUrl() {
      if (!this.selectedBuildingId) return "";
      return `/vtour/pannellum.html?buildingId=${this.selectedBuildingId}`;
    },
    currentStudioScene() {
      if (!this.studioActiveSceneId) return this.sortedScenes[0] || null;
      return this.vrScenes.find(s => s.id === this.studioActiveSceneId) || this.sortedScenes[0] || null;
    },
    currentStudioSceneHotspots() {
      return this.currentStudioScene?.hotspots || [];
    },
    currentClickSourceSceneName() {
      const src = this.vrScenes.find(s => s.id === this.newHotspotForm.sceneId);
      return src ? src.name : "Scene hiện tại";
    },
    candidateTargetScenes() {
      // Hotspots should point to any scene EXCEPT the current source scene
      return this.vrScenes.filter(s => s.id !== this.newHotspotForm.sceneId);
    }
  },
  async mounted() {
    window.addEventListener('message', this.handleIframeMessage);
    await this.loadBuildings();
    if (this.selectedBuildingId) {
      await this.loadVrScenes();
      this.findSelectedBuilding();
    }
  },
  beforeUnmount() {
    window.removeEventListener('message', this.handleIframeMessage);
  },
  methods: {
    // ---------------- Message Handler from Pannellum iframe ----------------
    handleIframeMessage(event) {
      if (!event.data || typeof event.data !== 'object') return;

      if (event.data.type === 'vr-click') {
        const { sceneId, pitch, yaw } = event.data;
        // sceneId comes as number or string from pannellum (e.g. s12 -> 12 or 12)
        const numericSceneId = typeof sceneId === 'string' && sceneId.startsWith('s') 
          ? parseInt(sceneId.substring(1), 10) 
          : parseInt(sceneId, 10);

        this.openAddHotspotDialog({
          sceneId: numericSceneId || this.studioActiveSceneId || (this.vrScenes[0]?.id),
          pitch,
          yaw
        });
      }
    },

    // ---------------- API Loaders ----------------
    async loadBuildings() {
      try {
        const res = await axios.get('/api/buildings');
        this.buildings = res.data || [];
      } catch (err) {
        console.error('Lỗi khi tải danh sách tòa nhà:', err);
        this.toast.error('Không thể tải danh sách tòa nhà');
      }
    },

    async loadVrScenes() {
      if (!this.selectedBuildingId) {
        this.vrScenes = [];
        return;
      }
      try {
        const res = await axios.get(`/api/vr/${this.selectedBuildingId}`);
        this.vrScenes = res.data || [];
        this.$emit('vr-scenes-updated', this.vrScenes);

        // Update studio active scene if not set or deleted
        if (!this.studioActiveSceneId && this.vrScenes.length > 0) {
          this.studioActiveSceneId = this.vrScenes[0].id;
        } else if (this.studioActiveSceneId && !this.vrScenes.some(s => s.id === this.studioActiveSceneId)) {
          this.studioActiveSceneId = this.vrScenes[0]?.id || null;
        }
      } catch (err) {
        console.error('Lỗi khi tải danh sách VR360:', err);
        this.toast.error('Không thể tải danh sách cảnh VR360');
      }
    },

    findSelectedBuilding() {
      if (this.selectedBuildingId) {
        this.selectedBuilding = this.buildings.find(b => b.id == this.selectedBuildingId) || null;
      } else {
        this.selectedBuilding = null;
      }
    },

    onBuildingChange() {
      this.findSelectedBuilding();
      this.loadVrScenes();
    },

    getSceneNameById(id) {
      const sc = this.vrScenes.find(s => s.id === id);
      return sc ? sc.name : `Scene #${id}`;
    },

    // ---------------- Tab & Studio Switching ----------------
    switchToHotspotStudio() {
      this.activeTab = 'studio';
      if (!this.studioActiveSceneId && this.sortedScenes.length > 0) {
        this.studioActiveSceneId = this.sortedScenes[0].id;
      }
    },

    openHotspotStudioForScene(scene) {
      this.studioActiveSceneId = scene.id;
      this.activeTab = 'studio';
    },

    onStudioSceneChange() {
      // Scene changed in inspector
    },

    reloadIframeScenes() {
      const iframe = this.$refs.vrIframe;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'reload-scenes' }, '*');
        this.toast.info('Đang làm mới dữ liệu tour...');
      }
    },

    // ---------------- Scene Management (Add, Edit, Reorder, Delete) ----------------
    openAddSceneModal() {
      if (this.vrScenes.length >= 10) {
        this.toast.warning('Tòa nhà đã đạt tối đa 10 scenes VR360!');
        return;
      }
      this.newSceneForm = {
        name: "",
        description: "",
        file: null,
        preview: null
      };
      if (this.$refs.sceneFileInput) {
        this.$refs.sceneFileInput.value = "";
      }
      this.showAddModal = true;
    },

    onFileSelected(event) {
      const file = event.target.files?.[0];
      if (!file) return;

      // Max 25MB
      if (file.size > 25 * 1024 * 1024) {
        this.toast.error('Kích thước ảnh không được vượt quá 25MB');
        return;
      }

      const ext = file.name.split('.').pop()?.toLowerCase();
      const validExts = ['jpg', 'jpeg', 'png', 'webp'];
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type) && !validExts.includes(ext)) {
        this.toast.error('Chỉ chấp nhận file ảnh định dạng JPG, JPEG, PNG, WEBP');
        return;
      }

      this.newSceneForm.file = file;
      if (!this.newSceneForm.name) {
        const baseName = file.name.replace(/\.[^/.]+$/, "");
        this.newSceneForm.name = baseName;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.newSceneForm.preview = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    async submitAddScene() {
      if (!this.newSceneForm.name || !this.newSceneForm.file) {
        this.toast.error('Vui lòng nhập tên scene và chọn file ảnh');
        return;
      }
      if (!this.selectedBuildingId) {
        this.toast.error('Vui lòng chọn tòa nhà trước');
        return;
      }

      this.isUploading = true;
      try {
        const formData = new FormData();
        formData.append('name', this.newSceneForm.name.trim());
        formData.append('buildingId', this.selectedBuildingId);
        formData.append('file', this.newSceneForm.file);
        if (this.newSceneForm.description) {
          formData.append('description', this.newSceneForm.description.trim());
        }

        const res = await axios.post('/api/vr', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        this.toast.success('Thêm scene VR360 thành công!');
        this.showAddModal = false;
        await this.loadVrScenes();
        this.reloadIframeScenes();
      } catch (err) {
        console.error('Lỗi khi thêm scene:', err);
        const msg = err.response?.data?.message || 'Có lỗi xảy ra khi thêm scene VR360!';
        this.toast.error(msg);
      } finally {
        this.isUploading = false;
      }
    },

    openEditSceneModal(scene) {
      this.editingSceneForm = {
        id: scene.id,
        name: scene.name,
        description: scene.description || "",
        sortOrder: scene.sortOrder || 1
      };
      this.showEditModal = true;
    },

    async submitEditScene() {
      if (!this.editingSceneForm.name) {
        this.toast.error('Tên scene không được để trống');
        return;
      }

      this.isUpdatingScene = true;
      try {
        await axios.put(`/api/vr/${this.editingSceneForm.id}`, {
          name: this.editingSceneForm.name.trim(),
          description: this.editingSceneForm.description.trim(),
          sortOrder: this.editingSceneForm.sortOrder
        });

        this.toast.success('Cập nhật scene thành công!');
        this.showEditModal = false;
        await this.loadVrScenes();
        this.reloadIframeScenes();
      } catch (err) {
        console.error('Lỗi khi cập nhật scene:', err);
        const msg = err.response?.data?.message || 'Không thể cập nhật scene';
        this.toast.error(msg);
      } finally {
        this.isUpdatingScene = false;
      }
    },

    async moveScene(scene, direction) {
      const list = this.sortedScenes;
      const currentIndex = list.findIndex(s => s.id === scene.id);
      const targetIndex = currentIndex + direction;

      if (targetIndex < 0 || targetIndex >= list.length) return;

      const neighbor = list[targetIndex];
      const tempOrder = scene.sortOrder || (currentIndex + 1);
      const neighborOrder = neighbor.sortOrder || (targetIndex + 1);

      try {
        // Swap sort orders
        await axios.put(`/api/vr/${scene.id}`, {
          name: scene.name,
          description: scene.description,
          sortOrder: neighborOrder
        });

        await axios.put(`/api/vr/${neighbor.id}`, {
          name: neighbor.name,
          description: neighbor.description,
          sortOrder: tempOrder
        });

        this.toast.success('Đã cập nhật thứ tự scene');
        await this.loadVrScenes();
        this.reloadIframeScenes();
      } catch (err) {
        console.error('Lỗi khi đổi thứ tự scene:', err);
        this.toast.error('Không thể cập nhật thứ tự');
      }
    },

    openDeleteSceneModal(scene) {
      this.sceneToDelete = scene;
      this.showDeleteModal = true;
    },

    async confirmDeleteScene() {
      if (!this.sceneToDelete) return;
      this.isDeleting = true;

      try {
        await axios.delete(`/api/vr/${this.sceneToDelete.id}`);
        this.toast.success('Xóa scene thành công!');
        this.showDeleteModal = false;
        this.sceneToDelete = null;
        await this.loadVrScenes();
        this.reloadIframeScenes();
      } catch (err) {
        console.error('Lỗi khi xóa scene:', err);
        const msg = err.response?.data?.message || 'Không thể xóa scene';
        this.toast.error(msg);
      } finally {
        this.isDeleting = false;
      }
    },

    // ---------------- Hotspot Creation & Deletion ----------------
    openAddHotspotDialog({ sceneId, pitch, yaw }) {
      this.newHotspotForm = {
        sceneId: sceneId || this.studioActiveSceneId,
        targetSceneId: "",
        text: "",
        pitch: parseFloat(pitch),
        yaw: parseFloat(yaw)
      };
      this.showAddHotspotModal = true;
    },

    onTargetSceneChanged() {
      if (!this.newHotspotForm.targetSceneId) return;
      const target = this.vrScenes.find(s => s.id == this.newHotspotForm.targetSceneId);
      if (target && !this.newHotspotForm.text) {
        this.newHotspotForm.text = `Đi sang ${target.name}`;
      }
    },

    async submitAddHotspot() {
      if (!this.newHotspotForm.targetSceneId) {
        this.toast.error('Vui lòng chọn phòng đích');
        return;
      }

      this.isSavingHotspot = true;
      try {
        const sceneId = this.newHotspotForm.sceneId;
        const payload = {
          targetSceneId: Number(this.newHotspotForm.targetSceneId),
          text: this.newHotspotForm.text.trim() || undefined,
          pitch: this.newHotspotForm.pitch,
          yaw: this.newHotspotForm.yaw
        };

        await axios.post(`/api/vr/${sceneId}/hotspots`, payload);

        this.toast.success('🎉 Đã thêm điểm nối (Hotspot) thành công!');
        this.showAddHotspotModal = false;
        await this.loadVrScenes();
        this.reloadIframeScenes();
      } catch (err) {
        console.error('Lỗi khi thêm hotspot:', err);
        const msg = err.response?.data?.message || 'Không thể lưu hotspot';
        this.toast.error(msg);
      } finally {
        this.isSavingHotspot = false;
      }
    },

    async deleteHotspot(hotspot) {
      if (!confirm(`Xóa hotspot chuyển tới "${hotspot.targetSceneName || 'phòng này'}"?`)) {
        return;
      }

      try {
        await axios.delete(`/api/vr/hotspots/${hotspot.id}`);
        this.toast.success('Đã xóa hotspot');
        await this.loadVrScenes();
        this.reloadIframeScenes();
      } catch (err) {
        console.error('Lỗi khi xóa hotspot:', err);
        this.toast.error('Không thể xóa hotspot');
      }
    },

    // ---------------- Tour Modal & Utilities ----------------
    openFullTourModal() {
      if (this.vrScenes.length === 0) {
        this.toast.warning('Chưa có cảnh nào để xem tour');
        return;
      }
      this.showFullTourModal = true;
    },

    handleImageError(event) {
      event.target.src = this.defaultVrImage;
    },

    formatFileSize(bytes) {
      if (!bytes) return "0 MB";
      return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    }
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleUp {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

.animate-scale-up {
  animation: scaleUp 0.2s ease-out;
}
</style>
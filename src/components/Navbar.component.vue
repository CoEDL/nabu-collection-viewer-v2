<template>
    <div class="flex flex-row space-x-4 bg-blue-200 p-4">
        <div class="pt-1">PARADISEC Offline Catalog</div>
        <div class="flex-grow"></div>
        <router-link :to="{ path: '/collections' }">
            <el-button>
                <i class="fas fa-layer-group"></i>
                <span class="hidden md:inline-block">&nbsp;Browse Collections</span>
            </el-button>
        </router-link>
        <router-link :to="{ path: '/items' }">
            <el-button>
                <i class="fas fa-folder-open"></i>
                <span class="hidden md:inline-block">&nbsp;Browse All Items</span>
            </el-button>
        </router-link>
    </div>
</template>

<script setup></script>

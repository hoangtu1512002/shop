<template>
    <div class="checkbox-wrapper">
        <input
            class="inp-cbx"
            :id="checkboxId"
            name="checkbox"
            type="checkbox"
            @change="handleChecked"
        />
        <label class="cbx" :for="checkboxId"
            ><span>
                <svg width="12px" height="10px" viewbox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span
            ><span></span>
        </label>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";

    const props = defineProps({
        check_all: {
            type: Boolean,
            default: false,
        },
    });

    const checkboxId = ref("cbx-" + Math.random().toString(36).substr(2, 9));

    const handleChecked = (e: Event) => {
        const checked = e.target?.checked;
        if (props.check_all === true) {
            const inputs = document.querySelectorAll(".inp-cbx");
            handleCheckAll(inputs, checked);
        }
    };

    const handleCheckAll = (inputs: any, checked: any) => {
        if (checked) {
            inputs.forEach((input: any) => {
                input.checked = true;
            });
        } else {
            inputs.forEach((input: any) => {
                input.checked = false;
            });
        }
    };
</script>

<style scoped>
    .checkbox-wrapper input[type="checkbox"] {
        display: none;
        visibility: hidden;
    }

    .checkbox-wrapper .cbx {
        margin: auto;
        -webkit-user-select: none;
        user-select: none;
        cursor: pointer;
    }

    .checkbox-wrapper .cbx span {
        display: inline-block;
        vertical-align: middle;
        transform: translate3d(0, 0, 0);
    }

    .checkbox-wrapper .cbx span:first-child {
        position: relative;
        width: 18px;
        height: 18px;
        border-radius: 3px;
        transform: scale(1);
        vertical-align: middle;
        border: 1px solid #9098a9;
        transition: all 0.2s ease;
    }

    .checkbox-wrapper .cbx span:first-child svg {
        position: absolute;
        top: 3px;
        left: 2px;
        fill: none;
        stroke: #ffffff;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 16px;
        stroke-dashoffset: 16px;
        transition: all 0.3s ease;
        transition-delay: 0.1s;
        transform: translate3d(0, 0, 0);
    }

    .checkbox-wrapper .cbx span:first-child:before {
        content: "";
        width: 100%;
        height: 100%;
        background: var(--blue-color);
        display: block;
        transform: scale(0);
        opacity: 1;
        border-radius: 50%;
    }

    .checkbox-wrapper .cbx span:last-child {
        padding-left: 8px;
    }

    .checkbox-wrapper .cbx:hover span:first-child {
        border-color: var(--blue-color);
    }

    .checkbox-wrapper .inp-cbx:checked + .cbx span:first-child {
        background: var(--blue-color);
        border-color: var(--blue-color);
        animation: wave-46 0.4s ease;
    }

    .checkbox-wrapper .inp-cbx:checked + .cbx span:first-child svg {
        stroke-dashoffset: 0;
    }

    .checkbox-wrapper .inp-cbx:checked + .cbx span:first-child:before {
        transform: scale(3.5);
        opacity: 0;
        transition: all 0.6s ease;
    }

    @keyframes wave-46 {
        50% {
            transform: scale(0.9);
        }
    }
</style>

import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "vue";
import ControlPanel from "../ControlPanel.vue";

const app = createApp({});

describe("ControlPanel", () => {
	beforeEach(() => {
		const pinia = createPinia();
		app.use(pinia);
		setActivePinia(pinia);
	});
	it("renders properly", () => {
		const wrapper = mount(ControlPanel, { props: {} });
		expect(wrapper.text()).toContain("Composition");
		expect(wrapper.text()).toContain("Syntax Colors");
		expect(wrapper.text()).toContain("Font Size");
	});
});

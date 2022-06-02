import 'package:get/get.dart';

import 'template_controller.dart';
import 'template_repository.dart';


class TemplateBinding implements Bindings {
  @override
  void dependencies() {
    Get.lazyPut<TemplateRepository>(() => TemplateRepository());
    Get.lazyPut<TemplateController>(() => TemplateController());
  }
}

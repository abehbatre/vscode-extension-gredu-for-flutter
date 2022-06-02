import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:gredu_common/gredu_common.dart';

import 'template_controller.dart';

class TemplateView extends GetWidget<TemplateController> {
  const TemplateView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: 'Template'.text.extraBold.bodyText1(context).make(),
        elevation: 0.5,
        leading: IconButton(icon: Icon(Icons.arrow_back_outlined), onPressed: () => Get.back()),
      ),
      body: VStack(
        [
          'Template'.text.makeCentered(),
        ],
      ).p16(),
    );
  }
}
